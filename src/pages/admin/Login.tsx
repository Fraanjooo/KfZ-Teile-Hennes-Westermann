import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Login = () => {
  const navigate = useNavigate();
  const { user, signIn, loading } = useAuth();
  
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      navigate("/admin/dashboard");
    }
  }, [user, loading, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) return;
    
    setIsSubmitting(true);
    const { error } = await signIn(loginEmail, loginPassword);
    
    if (!error) {
      // Give time for admin role to be checked, then navigate
      setTimeout(() => {
        navigate("/admin/dashboard", { replace: true });
      }, 500);
    }
    setIsSubmitting(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blog-background">
        <div className="text-lg text-blog-accent">Laden...</div>
      </div>
    );
  }

  // If user is logged in, redirect to dashboard
  if (user) {
    return null; // The useEffect will handle the navigation
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blog-background p-4">
      <Card className="w-full max-w-md shadow-blog-hover">
        <CardHeader className="bg-blog-accent text-white rounded-t-lg">
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <CardDescription className="text-white/90">Melden Sie sich mit Ihren Zugangsdaten an</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login-email">E-Mail</Label>
              <Input
                id="login-email"
                type="email"
                placeholder="ihre@email.de"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="login-password">Passwort</Label>
              <Input
                id="login-password"
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-blog-accent hover:bg-blog-accent-hover text-white" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Wird angemeldet..." : "Anmelden"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
