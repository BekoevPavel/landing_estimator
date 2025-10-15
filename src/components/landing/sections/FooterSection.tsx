import { useTranslation } from "react-i18next";
import { Zap, MessageSquare, Users } from "lucide-react";

export function FooterSection() {
  const { t } = useTranslation();
  
  const productLinks = t("landing.footer.product.links", { returnObjects: true }) as Array<{
    label: string;
    href: string;
  }>;
  const resourcesLinks = t("landing.footer.resources.links", { returnObjects: true }) as Array<{
    label: string;
    href: string;
  }>;
  const companyLinks = t("landing.footer.company.links", { returnObjects: true }) as Array<{
    label: string;
    href: string;
  }>;

  return (
    <footer className="border-t border-border bg-card/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold">{t("header.title")}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {t("landing.footer.description")}
            </p>
          </div>

          <div>
            <h4 className="mb-4">{t("landing.footer.product.title")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-foreground transition">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4">{t("landing.footer.resources.title")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {resourcesLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-foreground transition">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4">{t("landing.footer.company.title")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-foreground transition">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {t("landing.footer.copyright")}
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

