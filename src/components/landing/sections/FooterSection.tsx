import { Zap, MessageSquare, Users } from "lucide-react";

export function FooterSection() {
  return (
    <footer className="border-t border-border bg-card/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold">EstimateFast</span>
            </div>
            <p className="text-sm text-muted-foreground">
              AI-powered project estimation platform
            </p>
          </div>

          <div>
            <h4 className="mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition">How It Works</a></li>
              <li><a href="#" className="hover:text-foreground transition">Pricing</a></li>
              <li><a href="#" className="hover:text-foreground transition">Examples</a></li>
              <li><a href="#" className="hover:text-foreground transition">API (soon)</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition">Blog</a></li>
              <li><a href="#" className="hover:text-foreground transition">Case Studies</a></li>
              <li><a href="#" className="hover:text-foreground transition">Guides</a></li>
              <li><a href="#" className="hover:text-foreground transition">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition">About</a></li>
              <li><a href="#" className="hover:text-foreground transition">Contact</a></li>
              <li><a href="#" className="hover:text-foreground transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-foreground transition">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 EstimateFast. Made with AI ❤️ for humans
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-muted-foreground hover:text-foreground transition">
              <MessageSquare className="w-5 h-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition">
              <Users className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

