import { AuthMenu } from "@/components/auth/auth-menu"

export default function LoginPage() {
  // This page will automatically open the login dialog
  return (
    <div className="container mx-auto py-20 flex flex-col items-center justify-center min-h-[70vh]">
      <h1 className="text-3xl font-bold mb-8">Login to Your Account</h1>
      <p className="text-muted-foreground mb-8 text-center max-w-md">
        Please use the login button below to access your RoadRescue account and manage your roadside assistance
        services.
      </p>

      <div className="hidden">
        <AuthMenu />
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('DOMContentLoaded', function() {
              // Find and click the login button after a short delay
              setTimeout(() => {
                const loginButton = document.querySelector('[aria-label="account"]') || 
                                   document.querySelector('.dropdown-trigger');
                if (loginButton) {
                  loginButton.click();
                  
                  // Set a timeout to click the login option in the dropdown
                  setTimeout(() => {
                    const loginOption = document.querySelector('[data-login-trigger]');
                    if (loginOption) {
                      loginOption.click();
                    }
                  }, 100);
                }
              }, 300);
            });
          `,
        }}
      />
    </div>
  )
}
