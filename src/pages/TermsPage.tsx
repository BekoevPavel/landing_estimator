/**
 * Terms of Service Page
 * Comprehensive legal terms including ToS, Privacy Policy, and Refund Policy
 */

import React from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ArrowLeft } from "lucide-react";
import Header from "../components/Header";

export default function TermsPage() {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <Header onLogoClick={handleBackToHome} />

      {/* Terms Content */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen px-6 py-24"
      >
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={handleBackToHome}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>

          {/* Main Content */}
          <div className="bg-card/50 backdrop-blur-xl border border-border rounded-3xl p-8 md:p-12">
            <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
            <p className="text-muted-foreground mb-8">Last Updated: November 15, 2024</p>

            <div className="prose prose-invert max-w-none space-y-8">

              {/* 1. Agreement to Terms */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
                <p className="text-muted-foreground mb-4">
                  By accessing or using EstimateFast ("Service"), you agree to be bound by these Terms of Service ("Terms").
                  If you disagree with any part of these terms, you may not access the Service.
                </p>
                <p className="text-muted-foreground">
                  <strong>Service Provider:</strong> EstimateFast is operated by Pavel Bekoev, Individual Entrepreneur,
                  registered in Georgia. Contact: <a href="mailto:estimatemyfast@gmail.com" className="text-primary hover:underline">estimatemyfast@gmail.com</a>
                </p>
              </section>

              {/* 2. Service Description */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">2. Service Description</h2>
                <p className="text-muted-foreground mb-4">
                  EstimateFast is an AI-powered project estimation platform that provides software project cost estimates,
                  task breakdowns, and risk analysis using specialized AI agents.
                </p>
                <p className="text-muted-foreground">
                  We reserve the right to modify, suspend, or discontinue the Service (or any part thereof) at any time
                  with or without notice.
                </p>
              </section>

              {/* 3. Pricing and Payment */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">3. Pricing and Payment</h2>
                <p className="text-muted-foreground mb-4">
                  <strong>Payment Plans:</strong> We offer one-time payment plans for access to our estimation service:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                  <li>Starter Pack: $5-$10 (one-time payment)</li>
                  <li>Professional Pack: $15-$30 (one-time payment)</li>
                  <li>Max Pack: $50-$80 (one-time payment)</li>
                </ul>
                <p className="text-muted-foreground mb-4">
                  <strong>Payment Processing:</strong> Payments are processed securely through Stripe or Paddle.
                  By making a purchase, you agree to provide accurate payment information and authorize us to charge
                  your payment method.
                </p>
                <p className="text-muted-foreground">
                  <strong>Pricing Changes:</strong> We reserve the right to change our pricing at any time.
                  Price changes will not affect purchases already made.
                </p>
              </section>

              {/* 4. Refund Policy */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">4. Refund Policy</h2>
                <p className="text-muted-foreground mb-4">
                  <strong>14-Day Money-Back Guarantee:</strong> We offer a full refund within 14 days of purchase
                  if you are not satisfied with the Service.
                </p>
                <p className="text-muted-foreground mb-4">
                  <strong>How to Request a Refund:</strong>
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                  <li>Email us at <a href="mailto:estimatemyfast@gmail.com" className="text-primary hover:underline">estimatemyfast@gmail.com</a> within 14 days of purchase</li>
                  <li>Include your order number and email used for purchase</li>
                  <li>Refunds are processed within 5 business days</li>
                  <li>Refund will be issued to the original payment method</li>
                </ul>
                <p className="text-muted-foreground">
                  <strong>Exceptions:</strong> Refunds may be denied in cases of abuse, fraudulent activity,
                  or repeated refund requests.
                </p>
              </section>

              {/* 5. User Accounts and Data */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">5. User Accounts and Data</h2>
                <p className="text-muted-foreground mb-4">
                  <strong>Account Responsibility:</strong> You are responsible for maintaining the confidentiality
                  of your account credentials and for all activities that occur under your account.
                </p>
                <p className="text-muted-foreground mb-4">
                  <strong>Data Ownership:</strong> You retain all rights to the project data and estimates you create
                  using our Service. We do not claim ownership of your data.
                </p>
                <p className="text-muted-foreground">
                  <strong>Data Storage:</strong> We store your project data, estimates, and account information on
                  secure servers. See our Privacy Policy below for details on data handling.
                </p>
              </section>

              {/* 6. Intellectual Property */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property</h2>
                <p className="text-muted-foreground mb-4">
                  The Service, including all content, features, and functionality, is owned by EstimateFast and
                  protected by international copyright, trademark, and other intellectual property laws.
                </p>
                <p className="text-muted-foreground">
                  You may not copy, modify, distribute, sell, or lease any part of our Service without explicit
                  written permission.
                </p>
              </section>

              {/* 7. Prohibited Uses */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">7. Prohibited Uses</h2>
                <p className="text-muted-foreground mb-4">You agree not to use the Service to:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe upon intellectual property rights</li>
                  <li>Transmit malicious code, viruses, or harmful content</li>
                  <li>Attempt to reverse engineer or copy the Service</li>
                  <li>Engage in automated data collection (scraping, crawling)</li>
                  <li>Resell or redistribute the Service without permission</li>
                </ul>
              </section>

              {/* 8. Limitation of Liability */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">8. Limitation of Liability</h2>
                <p className="text-muted-foreground mb-4">
                  <strong>No Warranty:</strong> The Service is provided "as is" without warranties of any kind,
                  either express or implied. We do not guarantee that the Service will be uninterrupted, secure,
                  or error-free.
                </p>
                <p className="text-muted-foreground mb-4">
                  <strong>Estimation Accuracy:</strong> While we strive for accurate project estimates, we cannot
                  guarantee the accuracy of AI-generated estimates. Estimates should be used as guidance only.
                </p>
                <p className="text-muted-foreground">
                  <strong>Liability Cap:</strong> In no event shall EstimateFast be liable for any indirect,
                  incidental, special, or consequential damages exceeding the amount you paid for the Service.
                </p>
              </section>

              {/* 9. Termination */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">9. Termination</h2>
                <p className="text-muted-foreground">
                  We reserve the right to terminate or suspend your access to the Service immediately, without
                  prior notice, for violations of these Terms or for any other reason at our sole discretion.
                </p>
              </section>

              {/* 10. Privacy Policy */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">10. Privacy Policy</h2>

                <h3 className="text-xl font-semibold mb-3 mt-6">10.1 Data We Collect</h3>
                <p className="text-muted-foreground mb-4">We collect the following information:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                  <li><strong>Account Data:</strong> Email address, payment information</li>
                  <li><strong>Project Data:</strong> Project estimates, requirements, and related information you input</li>
                  <li><strong>Usage Data:</strong> Analytics data (page views, clicks, session recordings via PostHog)</li>
                  <li><strong>Technical Data:</strong> IP address, browser type, device information, cookies</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">10.2 How We Use Your Data</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                  <li>Provide and improve the Service</li>
                  <li>Process payments and prevent fraud</li>
                  <li>Analyze usage patterns and optimize user experience</li>
                  <li>Send service-related communications</li>
                  <li>Comply with legal obligations</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">10.3 Third-Party Services</h3>
                <p className="text-muted-foreground mb-4">We use the following third-party services:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                  <li><strong>Stripe/Paddle:</strong> Payment processing</li>
                  <li><strong>PostHog:</strong> Product analytics and session recording</li>
                  <li><strong>Google Analytics:</strong> Website analytics</li>
                  <li><strong>Netlify:</strong> Hosting and infrastructure</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">10.4 Cookies</h3>
                <p className="text-muted-foreground mb-4">
                  We use cookies and similar tracking technologies to track activity on our Service and store
                  certain information. You can configure your browser to refuse cookies, but this may limit
                  Service functionality.
                </p>

                <h3 className="text-xl font-semibold mb-3 mt-6">10.5 Your Rights (GDPR)</h3>
                <p className="text-muted-foreground mb-4">Under GDPR, you have the right to:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                  <li><strong>Access:</strong> Request a copy of your personal data</li>
                  <li><strong>Rectification:</strong> Correct inaccurate data</li>
                  <li><strong>Erasure:</strong> Request deletion of your data</li>
                  <li><strong>Portability:</strong> Export your data in a machine-readable format</li>
                  <li><strong>Object:</strong> Object to data processing</li>
                </ul>
                <p className="text-muted-foreground">
                  To exercise these rights, contact us at <a href="mailto:estimatemyfast@gmail.com" className="text-primary hover:underline">estimatemyfast@gmail.com</a>
                </p>

                <h3 className="text-xl font-semibold mb-3 mt-6">10.6 Data Security</h3>
                <p className="text-muted-foreground mb-4">
                  We implement industry-standard security measures to protect your data, including encryption,
                  secure servers, and regular security audits. However, no method of transmission over the internet
                  is 100% secure.
                </p>

                <h3 className="text-xl font-semibold mb-3 mt-6">10.7 Data Retention</h3>
                <p className="text-muted-foreground">
                  We retain your data for as long as your account is active or as needed to provide the Service.
                  You may request deletion of your data at any time.
                </p>
              </section>

              {/* 11. Governing Law */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">11. Governing Law</h2>
                <p className="text-muted-foreground">
                  These Terms shall be governed by and construed in accordance with the laws of Georgia,
                  without regard to its conflict of law provisions. Any disputes shall be resolved in the
                  courts of Georgia.
                </p>
              </section>

              {/* 12. Changes to Terms */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">12. Changes to Terms</h2>
                <p className="text-muted-foreground">
                  We reserve the right to modify these Terms at any time. Changes will be posted on this page
                  with an updated "Last Updated" date. Continued use of the Service after changes constitutes
                  acceptance of the modified Terms.
                </p>
              </section>

              {/* 13. Contact Information */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">13. Contact Information</h2>
                <p className="text-muted-foreground mb-4">
                  For questions about these Terms, please contact us:
                </p>
                <div className="bg-muted/20 rounded-lg p-4">
                  <p className="text-muted-foreground"><strong>Service:</strong> EstimateFast</p>
                  <p className="text-muted-foreground"><strong>Operator:</strong> Pavel Bekoev, Individual Entrepreneur</p>
                  <p className="text-muted-foreground"><strong>Jurisdiction:</strong> Georgia</p>
                  <p className="text-muted-foreground">
                    <strong>Email:</strong> <a href="mailto:estimatemyfast@gmail.com" className="text-primary hover:underline">estimatemyfast@gmail.com</a>
                  </p>
                  <p className="text-muted-foreground"><strong>Website:</strong> https://estimatefast.ink</p>
                </div>
              </section>

              {/* Acceptance */}
              <section className="border-t border-border pt-8 mt-8">
                <p className="text-muted-foreground">
                  By using EstimateFast, you acknowledge that you have read, understood, and agree to be bound
                  by these Terms of Service.
                </p>
              </section>

            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
