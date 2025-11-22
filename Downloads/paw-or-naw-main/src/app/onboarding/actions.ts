'use server'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function createDogProfile(formData: FormData) {
    const supabase = await createClient()
    
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    const name = formData.get('name') as string
    const breed = formData.get('breed') as string
    const age = Number(formData.get('age'))
    const bio = formData.get('bio') as string
    const photoFile = formData.get('photo') as File

    let photoUrl = ''

    if (photoFile && photoFile.size > 0) {
        const fileExt = photoFile.name.split('.').pop()
        const fileName = `${user.id}-${Date.now()}.${fileExt}`
        const { error: uploadError } = await supabase.storage
            .from('dog-photos')
            .upload(fileName, photoFile)

        if (uploadError) {
            console.error('Upload error', uploadError)
            // Handle error
        } else {
             const { data: { publicUrl } } = supabase.storage
                .from('dog-photos')
                .getPublicUrl(fileName)
             photoUrl = publicUrl
        }
    }

    const { error: insertError } = await supabase.from('dogs').insert({
        user_id: user.id,
        name,
        breed,
        age,
        bio,
        photos: photoUrl ? [photoUrl] : [],
    })

    if (insertError) {
        console.error('Insert error', insertError)
        // In a real app, return validation errors
        return { error: 'Failed to create profile' }
    }

    redirect('/')
}

