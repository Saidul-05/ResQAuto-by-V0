import { AuthMenu } from "@/components/auth/auth-menu"

export default function RegisterPage() {
  // This page will automatically open the signup dialog
  return (
    <div className="container mx-auto py-20 flex flex-col items-center justify-center min-h-[70vh]">
      <h1 className="text-3xl font-bold mb-8">Create Your Account</h1>
      <p className="text-muted-foreground mb-8 text-center max-w-md">
        Sign up for RoadRescue to access premium roadside assistance services and enjoy peace of mind on the road.
      </p>

      <div className="hidden">
        <AuthMenu />
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('DOMContentLoaded', function() {
              // Find and click the account button after a short delay
              setTimeout(() => {
                const accountButton = document.querySelector('[aria-label="account"]') || 
                                     document.querySelector('.dropdown-trigger');
                if (accountButton) {
                  accountButton.click();
                  
                  // Set a timeout to click the signup option in the dropdown
                  setTimeout(() => {
                    const signupOption = document.querySelector('[data-signup-trigger]');
                    if (signupOption) {
                      signupOption.click();
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
