import { notFound } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { PaymentButton } from '@/components/readings/PaymentButton'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { psychicData } from '@/lib/psychics'
import { getReadingTypeById } from '@/lib/reading-types-data'
import Image from 'next/image'

export default function BookReadingPage({
  params,
  searchParams,
}: {
  params: { typeId: string }
  searchParams: { psychic?: string }
}) {
  // Get reading type from hardcoded data
  const readingType = getReadingTypeById(params.typeId)

  if (!readingType) {
    notFound()
  }
  const priceInDollars = (readingType.price / 100).toFixed(2)
  
  // Get psychic if specified
  const selectedPsychic = searchParams.psychic ? psychicData[searchParams.psychic as keyof typeof psychicData] : null

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link href={searchParams.psychic ? `/readings/types/${params.typeId}/psychics` : "/readings"} className="text-purple-300/80 hover:text-purple-200">
            ← Back to {searchParams.psychic ? 'Psychics' : 'Readings'}
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-mystical text-gradient-cream-gold mb-2">{readingType.name}</CardTitle>
            <CardDescription className="text-lg text-purple-300/80">{readingType.description}</CardDescription>
            {selectedPsychic && (
              <div className="mt-4 flex items-center gap-3 p-3 bg-purple-900/20 rounded-lg border border-purple-800/30">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-purple-700/50">
                  <Image
                    src={selectedPsychic.image}
                    alt={selectedPsychic.alt}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover object-top"
                    style={{ objectPosition: 'center top' }}
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-purple-200">Reading with {selectedPsychic.name}</p>
                  <p className="text-xs text-purple-400/80">{selectedPsychic.title}</p>
                </div>
              </div>
            )}
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-gradient-mystic">${priceInDollars}</span>
                <span className="text-purple-400/80">AUD</span>
              </div>
              <div className="text-sm text-purple-300/80 flex items-center gap-2">
                <span>⏱️</span>
                <span>Duration: {readingType.duration_minutes} minutes</span>
              </div>
            </div>

            <div className="border-t border-purple-800/30 pt-6">
              <h3 className="font-semibold mb-3 text-purple-100">What to Expect</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-purple-300/80">
                <li>One-on-one voice conversation with your AI psychic guide</li>
                <li>Personalised insights based on your questions</li>
                <li>Full transcript of your session saved to your account</li>
                <li>Access to your reading history anytime</li>
              </ul>
            </div>

            <div className="border-t border-purple-800/30 pt-6">
              <PaymentButton readingTypeId={readingType.id} psychic={searchParams.psychic} />
              <p className="text-xs text-purple-400/70 mt-4 text-center">
                Secure payment processed by Stripe. Your payment information is encrypted and secure.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

