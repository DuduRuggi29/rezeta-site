import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import Script from "next/script";
import { site } from "@/lib/site";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"], display: "swap", variable: "--font-montserrat" });

const title = "Agência de Marketing para Negócios Locais | REZETA";
const description =
  "Agência de marketing para negócios locais que precisam vender agora: leads qualificados direto no seu WhatsApp, com tráfego pago no Google e no Meta. Fale com a REZETA.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
  applicationName: site.name,
  keywords: ["agência de marketing para negócios locais", "marketing para restaurantes", "marketing jurídico", "marketing para advogados", "marketing médico", "marketing para clínicas", "marketing para clínica de estética", "gestão de tráfego pago", "google ads", "google meu negócio", "agência de marketing digital"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: "/",
    siteName: `${site.name} — ${site.tagline}`,
    title,
    description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "REZETA — Agência de Tráfego Pago: Captação e Conversão" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  icons: { icon: "/favicon.svg" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#FFD105",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={montserrat.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        {children}
        {site.gtmId && (
          <Script id="gtm" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${site.gtmId}');`}
          </Script>
        )}
        {!site.gtmId && site.googleAdsId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${site.googleAdsId}`} strategy="afterInteractive" />
            <Script id="gtag" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${site.googleAdsId}');`}
            </Script>
          </>
        )}
        {site.metaPixelId && (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${site.metaPixelId}');fbq('track','PageView');`}
          </Script>
        )}
      </body>
    </html>
  );
}
