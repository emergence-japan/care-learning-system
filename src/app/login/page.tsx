
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold">LMS ログイン</CardTitle>
          <CardDescription className="text-lg text-orange-600 font-medium">
            お疲れ様です！学習を始めましょう。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">メールアドレス</Label>
              <Input id="email" type="email" placeholder="example@mail.com" className="h-12 text-lg" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">パスワード</Label>
              <Input id="password" type="password" className="h-12 text-lg" required />
            </div>
            <Button type="submit" className="w-full h-14 text-xl font-bold bg-blue-600 hover:bg-blue-700">
              ログイン
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
