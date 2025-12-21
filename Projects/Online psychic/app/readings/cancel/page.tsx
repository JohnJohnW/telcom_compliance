import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'

export default function CancelPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Payment Cancelled</CardTitle>
          <CardDescription>
            Your payment was cancelled. No charges were made.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-purple-300/80">
            You can return to browse our reading types and try again when you&apos;re ready.
          </p>
          <Link href="/readings">
            <Button className="w-full">Browse Readings</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
