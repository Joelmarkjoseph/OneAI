import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation() as unknown as { state?: { from?: Location } };

  const handleGoogle = async () => {
    await signInWithGoogle();
    const redirectTo = (location.state && (location.state as any).from?.pathname) || "/dashboard";
    navigate(redirectTo, { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md p-6 space-y-4">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">Sign in</h1>
          <p className="text-sm text-muted-foreground">Use your Google account to continue.</p>
        </div>
        <Button onClick={handleGoogle} className="w-full">Continue with Google</Button>
      </Card>
    </div>
  );
};

export default Login;

