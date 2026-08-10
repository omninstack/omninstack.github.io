# Convergo: AI-Powered Omnichannel Messaging & Offline POS Attribution Platform

* 🇺🇸 **English:** [MARKETING_MATERIAL.md](./MARKETING_MATERIAL.md) (this file)
* 🇰🇷 **Korean:** [MARKETING_MATERIAL_ko.md](./MARKETING_MATERIAL_ko.md)

---

### **"Bridge the Gap Between Digital Campaigns and Physical Retail Sales"**

In today’s mobile-first world, customers expect businesses to meet them where they already hang out—on instant messaging apps. However, managing campaigns across WhatsApp, KakaoTalk, Telegram, and SMS is fragmented, and proving that a digital message actually drove a physical in-store sale is nearly impossible.

**Convergo**, our AI Customer Engagement Platform, solves this by unifying conversational messaging with AI-driven content generation, resilient failover systems, and real-time offline POS/Kiosk coupon attribution.

---

## 🚀 Key Value Propositions

### 1. **True Offline Attribution & POS Integration**
Stop guessing your digital marketing ROI. Convergo connects digital conversations to physical retail terminals.
* **Instant Coupon Redemption:** Customers receive custom barcode/QR coupons directly in their messaging apps, which can be scanned and validated in real time at the counter or self-service kiosks (**Clover, Toast, OKPOS, Force**, etc.).
* **ROI Attribution:** Automatically link physical in-store sales back to the specific digital message or campaign variant that drove the customer to the store.
* **Post-Purchase Automation:** Automatically trigger follow-up surveys, digital receipts, or return-discount coupons via WhatsApp or KakaoTalk the second a transaction is registered at the POS.

### 2. **AI-Powered Copywriting & Conversational RAG Search**
Boost engagement and conversions using built-in LLM assistants.
* **Copywriting Copilot:** Instantly generate multi-variant message copies, headlines, and call-to-actions (CTAs) optimized for different channels and brand voices.
* **Directory & Catalog Recommendation Search:** Allow customers to discover nearby physical stores or products via natural, conversational queries (e.g., *"Find a Korean restaurant near me serving Jjajangmyeon"*), powered by vector database searches (pgvector/Qdrant) and geographical coordinate filtering.
* **Alternative Suggestion Engine:** If an exact item or location is unavailable, the AI automatically proposes the best nearby alternatives and asks clarifying questions to maintain engagement.

### 3. **Omnichannel Delivery & Resilient Fallback Routing**
Never lose a lead due to delivery issues. Convergo supports global and regional platforms (WhatsApp, KakaoTalk, Telegram, LINE, Viber, Zalo, WeChat, SMS, RCS).
* **Automated Fallback:** Configure rules like: *"Attempt delivery via WhatsApp first; if the message is not delivered in 15 minutes, automatically send it via SMS."*
* **Consent & Compliance Sync:** Centralized, highly-available opt-out datastore (Redis) updates unsubscribe requests in real time across all channels, performing pre-flight consent checks to guarantee spam compliance.

### 4. **Enterprise-Grade High Availability & Monitoring**
* Built with a robust NestJS backend, React frontend, and distributed message queues (Kafka/RabbitMQ) for asynchronous webhook ingestion.
* Prompts system administrators via real-time Telegram alerts for webhook callbacks that time out or fail.

---

## 🎯 Target Audience

* **Retail Chains & Franchises:** Track foot traffic and sales generated from SMS/WhatsApp coupon campaigns in real time.
* **Digital Marketing Agencies:** Provide clients with verifiable, closed-loop ROI metrics connecting digital spend to physical store purchases.
* **Small & Medium Businesses (SMBs):** Automate customer onboarding, FAQ handling, and promotional cycles without dedicated developer teams.

---

## 🛠️ Technology Stack

* **Frontend:** React, TypeScript, Tailwind CSS
* **Backend:** Node.js, NestJS
* **Database & Caching:** PostgreSQL (TypeORM), Redis
* **AI Core:** LangChain, pgvector / Qdrant Vector Databases
* **Queues:** Apache Kafka / RabbitMQ
* **Infrastructure:** Docker, Kubernetes, AWS/GCP, Prometheus & Grafana

---

## 📞 Get Started Today

Are you ready to transform your instant Chat Apps into high-converting, measurable sales pipelines?

👉 **[Read the Setup & Run Guide](../run/RUNNING.md)** to launch the platform locally.
👉 Contact our team for an enterprise demonstration or API sandbox access.
