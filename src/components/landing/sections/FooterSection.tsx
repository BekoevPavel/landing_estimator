import { useTranslation } from "react-i18next";
import { Zap, Mail } from "lucide-react";
import { trackFooterLinkClick } from "../../../analytics/events";

interface FooterSectionProps {
  onStartTest?: () => void;
  onGoToPricing?: () => void;
}

export function FooterSection({ onStartTest, onGoToPricing }: FooterSectionProps) {
  const { t } = useTranslation();

  const productLinks = t("landing.footer.product.links", { returnObjects: true }) as Array<{
    label: string;
    href: string;
  }>;
  const resourcesLinks = t("landing.footer.resources.links", { returnObjects: true }) as Array<{
    label: string;
    href: string;
  }>;
  const companyEmail = t("landing.footer.company.email") as string;

  const handleLinkClick = (link: { label: string; href: string }, category: string) => {
    // Track analytics
    trackFooterLinkClick(link.label, category);

    // Special handling for pricing link - go directly to pricing screen
    if (link.label === "Pricing" || link.label === "Тарифы") {
      if (onGoToPricing) {
        onGoToPricing();
      }
    }
    // Other links with anchors will work automatically
  };

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
            <h4 className="mb-4 font-semibold">{t("landing.footer.product.title")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {productLinks.map((link) => (
                <li key={link.label}>
                  {link.label === "Pricing" || link.label === "Тарифы" ? (
                    <button
                      onClick={() => handleLinkClick(link, "product")}
                      className="hover:text-foreground transition text-left"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <a
                      href={link.href}
                      onClick={() => handleLinkClick(link, "product")}
                      className="hover:text-foreground transition"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">{t("landing.footer.resources.title")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {resourcesLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => handleLinkClick(link, "resources")}
                    className="hover:text-foreground transition"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">{t("landing.footer.company.title")}</h4>
            <a
              href={`mailto:${companyEmail}`}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition group"
              onClick={() => trackFooterLinkClick("Email", "contact")}
            >
              <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="break-all">{companyEmail}</span>
            </a>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            {t("landing.footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}

