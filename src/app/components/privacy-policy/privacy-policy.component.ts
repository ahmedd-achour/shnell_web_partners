import { Component } from '@angular/core';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent {
  appTitle = 'Shnell';
  welcomeMessage = 'Welcome to Shnell!';
  selectLanguage = 'Select Language';
  personalInfo = 'Personal Info';
  privacyPolicyTitle = 'Privacy Policy';
  privacyPolicyUpdated = 'This policy was last updated on {date}.';
  introHeading = '1. Introduction';
  introBody = `shnell Logistics ("we," "us," or "our") is committed to protecting your privacy and ensuring transparency in how we handle your personal information. This Privacy Policy outlines the practices of shnell Logistics, a transportation and logistics platform specializing in courier services, residential and commercial moving, heavy load transport, warehousing, international shipping, secure transport, and express delivery. By accessing or using the shnell Logistics mobile application, website, or related services (collectively, the "App"), you agree to the practices described in this policy.

This policy is designed to comply with applicable data protection laws, including but not limited to the General Data Protection Regulation (GDPR) for users in the European Union, the California Consumer Privacy Act (CCPA) for California residents, and other relevant regulations worldwide. We aim to provide clear, detailed, and accessible information about how we collect, use, share, and protect your personal data, as well as your rights regarding that data.

The App connects users (both individuals and businesses) with drivers and logistics providers to facilitate efficient and reliable transportation services. This policy applies to all users, including customers requesting services ("Customers"), drivers providing transportation services ("Drivers"), and businesses engaging in B2B logistics services ("Business Partners"). If you do not agree with this policy, please do not use the App.

We may update this policy periodically to reflect changes in our practices, technology, or legal requirements. You will be notified of significant changes via email, in-app notifications, or updates on our website at www.shnell.com/privacy-policy. Continued use of the App after such changes constitutes your acceptance of the revised policy.

This policy was last updated on **August 22, 2025**. Please review it carefully to understand our practices.`;
  infoCollectionHeading = '2. Information We Collect';
  infoCollectionBody = `We collect various types of information to provide, improve, and personalize our services. The information we collect falls into the following categories:

**2.1 Information You Provide Directly**

When you interact with the App, you may provide the following types of personal information:

- **Account Creation**: When registering as a Customer or Driver, you provide details such as your full name, email address, phone number, and, for Drivers, a valid national ID (e.g., CIN for Tunisian residents) or driver’s license number. Business Partners provide company details, including business name, registration number, and contact information.
- **Profile Information**: Customers may provide delivery preferences and addresses. Drivers provide vehicle details (e.g., type, capacity, license plate), professional certifications, and banking information for payments.
- **Service Requests**: Customers submit details about their logistics needs, such as package size, weight, pickup and delivery locations, and special instructions (e.g., fragile items or time-sensitive deliveries).
- **Communication Data**: Information provided when you contact our support team via email, in-app chat, or phone, including your messages, inquiries, and feedback.
- **Business Partner Data**: For B2B clients, we collect additional details such as tax identification numbers, contract details, and logistics requirements (e.g., fleet size, delivery schedules).

**2.2 Information Collected Automatically**

We automatically collect certain information when you use the App to enhance functionality and improve user experience:

- **Device Information**: We collect data about your device, including device type (e.g., iOS or Android), operating system version, unique device identifiers (e.g., UDID or IMEI), IP address, and browser type.
- **Location Data**: With your consent, we collect real-time geolocation data to enable features such as tracking shipments, matching Drivers with Customers, and optimizing delivery routes. Customers’ pickup and delivery locations are stored for service fulfillment.
- **Usage Data**: We track how you interact with the App, including pages visited, features used (e.g., tracking, quote requests), time spent, and click patterns.
- **Log Data**: Server logs capture technical details such as API calls, error reports, and timestamps to monitor App performance and troubleshoot issues.
- **Cookies and Tracking Technologies**: Our website uses cookies, web beacons, and similar technologies to track user behavior, personalize content, and analyze traffic. You can manage cookie preferences via your browser settings.

**2.3 Information from Third Parties**

We may receive information from third-party sources to enhance our services or comply with legal obligations:

- **Mapping Services**: Mapbox provides location-based data to optimize routing and display maps within the App.
- **Analytics Providers**: Tools like Firebase Analytics provide aggregated data on user behavior and App performance.
- **Verification Services**: For Drivers, we use third-party services to verify identity, driving records, and vehicle compliance with safety regulations.
- **Business Partners**: B2B clients may share employee or contractor data (e.g., contact details) to facilitate logistics coordination.

**2.4 Sensitive Information**

We may collect sensitive information, such as national ID numbers, only with your explicit consent or as required by law. We take additional measures to protect this data, as outlined in Section 5 (Data Security).`;
  infoUsageHeading = '3. How We Use Your Information';
  infoUsageBody = `We use the information we collect to operate, improve, and personalize the App’s services. The primary purposes include:

**3.1 Service Delivery**

- **Matching Customers and Drivers**: We use Customer location and service request data to match them with suitable Drivers based on proximity, vehicle capacity, and availability.
- **Order Fulfillment**: Information such as package details, pickup and delivery locations, and special instructions is used to ensure accurate and timely deliveries.
- **Tracking and Updates**: Real-time location data enables shipment tracking for Customers and route optimization for Drivers.

**3.2 Improving User Experience**

- **Personalization**: We analyze usage data to tailor the App experience, such as suggesting preferred services or displaying relevant promotions.
- **Performance Monitoring**: Device and log data help us identify and fix technical issues, ensuring a smooth user experience.
- **Analytics**: Aggregated data from Firebase Analytics and similar tools informs feature enhancements and service improvements.

**3.3 Communication**

- **Notifications**: We send in-app, email, or SMS notifications about order statuses, account updates, promotions, or policy changes. You can manage notification preferences in the App settings.
- **Customer Support**: Your contact details and communication history are used to respond to inquiries, resolve issues, and provide assistance.

**3.4 Driver Management**

- **Performance Display**: Before accepting a delivery request, Drivers can view Customer performance metrics, such as average rating (based on punctuality, communication, and payment history) and order frequency. This helps Drivers make informed decisions.
- **Deal Acceptance**: Drivers have the autonomy to accept or reject delivery requests based on the displayed information, with no penalty for rejections unless they violate our Terms of Use.
- **Account Management**: Driver information, including vehicle details and certifications, is used to verify eligibility and manage account status.
- **Driver Responsibility**: Drivers are responsible for the goods from the moment they confirm pickup until delivery confirmation.

**3.5 Legal and Regulatory Compliance**

- **Tax Reporting**: Transaction data may be used to comply with tax obligations, such as reporting Driver earnings to relevant authorities.
- **Fraud Prevention**: We analyze usage patterns and third-party data to detect and prevent fraudulent activities, such as unauthorized account access or payment fraud.
- **Legal Obligations**: We may use your data to respond to legal requests, such as court orders or regulatory investigations.

**3.6 Marketing and Promotions**

- With your consent, we use your contact information to send promotional offers, newsletters, or updates about new services. You can opt out at any time via the App or by contacting us.
- We may use aggregated, anonymized data to create marketing insights or case studies without identifying individual users.

**3.7 Research and Development**

- We use anonymized data to conduct research, develop new features, and improve our algorithms for matching, routing, and pricing.
- Feedback provided through surveys or support interactions helps us enhance the App’s functionality and user satisfaction.`;
  infoSharingHeading = '4. How We Share Your Information';
  infoSharingBody = `We may share your information with specific parties to deliver our services, comply with legal obligations, or improve the App. We ensure that any sharing is conducted responsibly and in accordance with applicable laws.

**4.1 Sharing with Other Users**

- **Customer-Driver Interactions**: When a Customer submits a service request, their name, contact details (e.g., phone number), pickup/delivery locations, and package details are shared with the assigned Driver to facilitate the delivery.
- **Driver Performance Display**: Customers can view Driver performance metrics, such as ratings (based on reliability, communication, and delivery success) and years of experience, before confirming a booking.
- **B2B Coordination**: For Business Partners, we may share logistics-related data (e.g., delivery schedules, employee contact details) with Drivers or third-party providers to fulfill contracts.

**4.2 Sharing with Service Providers**

We engage trusted third-party service providers to support our operations. These providers are contractually obligated to protect your data and use it only for the purposes we specify:

- **Mapping and Navigation**: Mapbox receives location data to provide mapping, routing, and geolocation services within the App.
- **Analytics Providers**: Firebase Analytics and other tools receive anonymized usage data to generate insights on App performance and user behavior.
- **Cloud Storage**: We use secure cloud providers (e.g., AWS, Google Cloud) to store user data, with encryption and access controls in place.
- **Verification Services**: Third-party services verify Driver identities, driving records, and vehicle compliance to ensure safety and regulatory compliance.
- **Customer Support Tools**: Platforms like Zendesk manage support tickets and store communication data to assist users effectively.

**4.3 Legal and Regulatory Sharing**

- We may share your information with government authorities, law enforcement, or regulatory bodies when required by law, such as in response to subpoenas, court orders, or tax audits.
- In cases of suspected fraud, abuse, or illegal activity, we may share relevant data with authorities to investigate or prevent harm.

**4.4 Business Transfers**

- If shnell Logistics is involved in a merger, acquisition, or asset sale, your information may be transferred to the acquiring entity. You will be notified of any such transfer and given the opportunity to opt out where applicable.
- We will ensure that any transferee agrees to protect your data in accordance with this policy or a comparable standard.

**4.5 Anonymized Data Sharing**

- We may share aggregated or anonymized data (e.g., delivery trends, user demographics) with partners, researchers, or advertisers. This data does not identify individuals and is used for statistical or marketing purposes.

**4.6 Consent-Based Sharing**

- We will not share your personal information with third parties for marketing purposes without your explicit consent. You can withdraw consent at any time via the App or by contacting us.`;
  dataSecurityHeading = '5. Data Security';
  dataSecurityBody = `We prioritize the security of your personal information and implement robust measures to protect it from unauthorized access, loss, misuse, or alteration.

**5.1 Technical Safeguards**

- **Encryption**: All sensitive data, including personal identifiers, is encrypted in transit (using TLS 1.2 or higher) and at rest (using AES-256 encryption).
- **Access Controls**: Only authorized personnel with a legitimate need can access user data, and access is restricted through role-based permissions and multi-factor authentication.
- **Secure Servers**: Our servers are hosted in secure data centers with physical and digital protections, including firewalls, intrusion detection systems, and regular security patches.

**5.2 Organizational Safeguards**

- **Employee Training**: All employees and contractors undergo regular training on data protection and privacy best practices.
- **Third-Party Audits**: We engage independent security firms to conduct regular audits of our systems and processes to identify and address vulnerabilities.
- **Vendor Management**: All third-party service providers are vetted for compliance with data protection standards, and contracts include strict confidentiality clauses.

**5.3 Incident Response**

- In the unlikely event of a data breach, we have a comprehensive incident response plan to investigate, mitigate, and notify affected users promptly, as required by law.
- We maintain detailed logs of security incidents to improve our defenses and prevent recurrence.

**5.4 User Responsibilities**

- You are responsible for maintaining the confidentiality of your account credentials (e.g., password, PIN). Do not share these with others.
- Use strong, unique passwords and enable two-factor authentication (if available) to enhance your account security.
- Report any suspected unauthorized access to your account immediately to support@shnell.com.`;
  dataRetentionHeading = '6. Data Retention';
  dataRetentionBody = `We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy or to comply with legal, regulatory, or operational requirements.

**6.1 Retention Periods**

- **Customer Data**: Information related to service requests (e.g., delivery details, payment records) is retained for 5 years after the last transaction to comply with tax and accounting regulations.
- **Driver Data**: Driver profiles, including certifications and transaction history, are retained for 7 years after account closure to comply with transportation and labor laws.
- **Communication Data**: Support tickets and correspondence are retained for 3 years to ensure quality control and resolve disputes.
- **Location Data**: Real-time location data is retained for 30 days after a delivery is completed, unless required for legal purposes or dispute resolution.
- **Anonymized Data**: Aggregated, non-identifiable data may be retained indefinitely for analytics and research purposes.

**6.2 Data Deletion**

- Upon account cancellation, you may request the deletion of your personal data via the App or by contacting support@shnell.com. We will delete your data within 30 days, except where retention is required by law (e.g., tax records).
- Anonymized data that cannot be linked to you may be retained for statistical purposes.
- Backups are securely deleted after 90 days to ensure no residual data remains.

**6.3 Data Archiving**

- Inactive accounts (no activity for 2 years) may be archived to reduce active storage. You will be notified before archiving, and you can reactivate your account by logging in or contacting support.
- Archived data is stored securely and subject to the same protections as active data.`;
  dataRightsHeading = '7. Your Data Protection Rights';
  dataRightsBody = `Depending on your location, you have certain rights regarding your personal data under applicable data protection laws, such as the GDPR, CCPA, or other regional regulations.

**7.1 Right to Access**

- You may request a copy of the personal data we hold about you, including details on how it is processed and shared.
- To request access, contact support@shnell.com or use the “Data Request” feature in the App. We will respond within 30 days (or 45 days for complex requests).

**7.2 Right to Correction**

- If your personal data is inaccurate or incomplete, you may request corrections via the App’s profile settings or by contacting support.
- We will update your information promptly and notify any third parties with whom the data was shared.

**7.3 Right to Deletion**

- You may request the deletion of your personal data, subject to legal retention requirements (e.g., tax records).
- Deletion requests can be submitted via the App or by emailing support@shnell.com. We will confirm deletion within 30 days.

**7.4 Right to Restrict Processing**

- You may request that we limit the processing of your data (e.g., to storage only) if you contest its accuracy, lawfulness, or necessity.
- Restricted data will not be used for active processing but may be retained for legal purposes.

**7.5 Right to Data Portability**

- You may request a machine-readable copy of your personal data (e.g., in CSV or JSON format) to transfer to another service.
- We will provide this data within 30 days, free of charge, for standard requests.

**7.6 Right to Object**

- You may object to the processing of your data for marketing purposes or where processing is based on our legitimate interests.
- To opt out of marketing, use the App’s settings or click “Unsubscribe” in promotional emails.

**7.7 Right to Withdraw Consent**

- Where processing is based on your consent (e.g., location data, marketing), you may withdraw consent at any time via the App or by contacting us. Withdrawal does not affect the lawfulness of prior processing.

**7.8 Right to Non-Discrimination**

- We will not discriminate against you for exercising your data protection rights, such as by charging higher prices or denying services.

**7.9 Filing a Complaint**

- If you believe we have violated your data protection rights, you may file a complaint with your local data protection authority (e.g., CNIL in France, ICO in the UK, or the California Attorney General’s office).
- You may also contact us directly at support@shnell.com to resolve any concerns informally.

**7.10 How to Exercise Your Rights**

- Submit requests via the App’s “Data Request” feature or email support@shnell.com with your name, account details, and the specific right you wish to exercise.
- We may require identity verification (e.g., a copy of your ID) to prevent unauthorized requests.
- Responses will be provided in writing (via email or in-app notification) within the legally required timeframe.`;
  thirdPartyHeading = '8. Third-Party Services';
  thirdPartyBody = `The App integrates with third-party services to provide essential functionality. These services have their own privacy policies, which apply separately to their processing of your data.

**8.1 Mapping and Navigation**

- **Mapbox**: Provides mapping, geolocation, and routing services. Mapbox receives location data to generate maps and optimize delivery routes. See Mapbox’s Privacy Policy at www.mapbox.com/privacy.
- **Analytics Providers**: Firebase Analytics and other tools receive anonymized usage data to generate insights on App performance and user behavior. Firebase may use device identifiers and usage patterns. See Google’s Privacy Policy at www.google.com/policies/privacy.
- **Mixpanel**: Tracks user interactions to improve App features. Mixpanel collects anonymized data, such as click patterns and session duration. See Mixpanel’s Privacy Policy at www.mixpanel.com/legal/privacy-policy.
- **Customer Support**: Zendesk manages support tickets and communication history. Zendesk stores your contact details and messages. See Zendesk’s Privacy Policy at www.zendesk.com/company/privacy.
- **Verification Services**: Jumio verifies Driver identities and documents (e.g., driver’s license, national ID). Jumio processes sensitive information securely. See Jumio’s Privacy Policy at www.jumio.com/legal-information/privacy-policy.
- **Onfido**: An alternative verification service for Driver onboarding. Onfido handles identity verification data. See Onfido’s Privacy Policy at www.onfido.com/privacy.
- **Cloud Storage**: Amazon Web Services (AWS) stores user data securely in encrypted form. AWS does not access or process your data beyond storage services. See AWS’s Privacy Policy at aws.amazon.com/privacy.
- **Google Cloud**: Provides additional cloud storage and processing capabilities. See Google’s Privacy Policy at www.google.com/policies/privacy.

**8.6 User Responsibility**

- You acknowledge that third-party services are governed by their respective privacy policies, and shnell is not responsible for their practices.
- We select reputable providers with strong data protection standards and ensure they comply with applicable laws.`;
  childrenPrivacyHeading = '9. Children\'s Privacy';
  childrenPrivacyBody = `The App is not intended for users under 18 years of age. We do not knowingly collect personal information from children under 18.

**9.1 Age Restrictions**

- Users must be at least 18 years old to create an account or use our services.
- Drivers must meet additional age and licensing requirements as specified in our Terms of Use (e.g., minimum age of 21 for certain vehicle types).

**9.2 Parental Consent**

- If we become aware that a user under 18 has provided personal information without verifiable parental consent, we will delete the information promptly.
- Parents or guardians who believe their child has submitted data to the App should contact support@shnell.com immediately.

**9.3 COPPA Compliance**

- For U.S. users, we comply with the Children’s Online Privacy Protection Act (COPPA). We do not collect, use, or share data from children under 13 without parental consent.`;
  commissionHeading = '10. Commission Structure';
  commissionBody = `shnell Logistics operates on a transparent commission-based model to ensure fair compensation for Drivers and sustainable operations for the platform.

**10.1 Commission Rate**

- **Standard Commission**: shnell deducts a **9% commission** from the total fare of each completed delivery or service. This commission covers platform maintenance, customer support, and operational costs.
- **Example**: If a delivery fare is 100 TND (Tunisian Dinar), shnell deducts 9 TND as commission, and the Driver receives 91 TND.
- **Transparency**: The commission is clearly displayed to Drivers before accepting a delivery request and in the transaction history within the App.

**10.2 Additional Fees**

- **Service Fees**: Customers may incur additional fees for premium services, such as express delivery or secure transport. These fees are disclosed during the booking process and do not affect the Driver’s commission.
- **Taxes**: Applicable taxes (e.g., VAT, sales tax) are calculated and added to the fare based on local regulations. Taxes are separate from the commission and are clearly itemized in receipts.
- **Surge Pricing**: During high-demand periods, fares may increase due to surge pricing. The 9% commission applies to the surged fare, increasing Driver earnings proportionally.

**10.3 Payment Processing**

- Customer payments are processed via in-office cash payments or mandat payments for account recharges, as online payments are not currently supported.
- Driver payouts are processed weekly (every Monday) to the Driver’s registered bank account or digital wallet, after deducting the 9% commission and any applicable taxes.
- Drivers can view their earnings, commission deductions, and payout schedules in the App’s “Earnings” section.

**10.4 Disputes**

- If a Customer disputes a charge, shnell will investigate and may temporarily hold the Driver’s payout until the dispute is resolved.
- Drivers will be notified of any disputes via email or in-app notifications and can provide evidence (e.g., delivery confirmation, photos) to support their case.
- Resolved disputes in favor of the Driver will result in immediate payout, minus the standard 9% commission.`;
  cancellationHeading = '11. Cancellation Policy';
  cancellationBody = `shnell Logistics has a clear cancellation policy to ensure fairness for Customers, Drivers, and the platform. Cancellations are handled differently based on the party initiating the cancellation and the timing.

**11.1 Customer Cancellations**

- **Before Driver Acceptance**: Customers may cancel a service request at any time before a Driver accepts it, with no penalty or fee.
- **After Driver Acceptance**: If a Customer cancels after a Driver has accepted the request but before pickup, a cancellation fee of 20% of the estimated fare (minimum 5 TND) may apply to compensate the Driver for time and fuel.
- **After Pickup**: Cancellations after the Driver has picked up the package are not permitted unless the Driver agrees or there is a valid reason (e.g., unsafe conditions). A full fare may be charged.
- **Process**: Customers can cancel via the App’s “Cancel Order” button or by contacting support@shnell.com. Refunds for cancellation fees are processed within 7 business days.
- **Frequent Cancellations**: Customers who frequently cancel their shipments risk temporary restrictions or account suspension.

**11.2 Driver Cancellations**

- **Before Pickup**: Drivers may not cancel a request after acceptance unless they arrive at the pickup location and wait 12 minutes without the Customer appearing. In such cases, Drivers are free to cancel without penalty.
- **After Pickup**: Drivers must complete the delivery unless there is a valid reason (e.g., safety concerns, Customer misconduct). Unauthorized cancellations after pickup may result in a penalty (e.g., 10 TND deduction from credits) and a lower performance rating.
- **Process**: Drivers cancel via the App’s “Cancel Delivery” feature, and Customers are notified immediately with an option to rebook with another Driver.

**11.3 shnell-Initiated Cancellations**

- **System Errors**: If a technical issue (e.g., server downtime, mapping errors) prevents service fulfillment, shnell may cancel the request. Customers receive a full refund, and Drivers are not penalized.
- **Policy Violations**: shnell may cancel requests involving fraudulent activity, prohibited items (e.g., hazardous materials), or violations of our Terms of Use. Affected parties will be notified with details.
- **Manual Cancellations**: Shipments accepted but not completed within 24 hours may be manually canceled by the admin, with penalties applied to both the Driver and Customer.
- **Force Majeure**: Cancellations due to unforeseen events (e.g., natural disasters, government restrictions) are exempt from fees, and both parties are notified promptly.

**11.4 Refunds**

- Refunds for Customer cancellations are processed to the original payment method within 7 business days.
- Drivers are not charged commissions for cancelled deliveries unless they are at fault (e.g., unauthorized cancellation after pickup).
- Refund disputes can be escalated to support@shnell.com for review.

**11.5 Notifications**

- All cancellations trigger automatic notifications to affected parties via email, SMS, or in-app alerts.
- Customers and Drivers can track cancellation history in the App’s “Order History” or “Earnings” sections.`;
  suspensionHeading = '12. Account Suspension and Termination';
  suspensionBody = `shnell Logistics reserves the right to suspend or terminate accounts to ensure platform integrity, safety, and compliance with our Terms of Use.

**12.1 Account Suspension**

- **Reasons for Suspension**: Breaches of our Terms of Use, such as providing false information, engaging in harassment, or transporting prohibited items. Detected fraud, unauthorized access, or attempts to manipulate ratings or earnings. Requirements from law enforcement or regulatory bodies to suspend an account pending investigation. Drivers with consistently low ratings (below 3.0 out of 5.0 for 10 consecutive deliveries) or frequent cancellations may face suspension. Customers who frequently cancel their shipments risk temporary restrictions or account suspension.
- **Process**: Suspended users receive an email and in-app notification detailing the reason, duration (e.g., 7 days, 30 days), and appeal instructions. During suspension, users cannot book or accept new services but can access their account to view history or submit appeals. Suspensions are reviewed regularly, and accounts may be reinstated upon resolution of the issue (e.g., payment clearance, policy compliance).

**12.2 Account Termination**

- **Reasons for Termination**: Engaging in deliberate fraud, such as falsifying delivery confirmations or payment details. Harassment, discrimination, or violence toward other users, shnell staff, or third parties. Transporting illegal goods, violating transportation laws, or engaging in criminal conduct. Multiple suspensions without corrective action.
- **Process**: Terminated users receive a detailed notice via email and in-app notification, unless prohibited by law (e.g., ongoing investigations). Upon termination, all scheduled deliveries are cancelled, and Customer refunds are processed within 7 business days. Drivers’ remaining credit balances (after commission deductions) are paid out within 30 days, subject to verification. Terminated accounts cannot be reactivated, but users may appeal for reconsideration.

**12.3 Appeals Process**

- Users may appeal suspensions or terminations within **14 days** of notification by emailing support@shnell.com or using the App’s “Appeal Decision” feature. Appeals must include the user’s name, account details, and any supporting evidence (e.g., delivery records, communication logs). shnell will review appeals within 10 business days and provide a written response. Decisions are final but may be escalated to an independent mediator for Business Partners.

**12.4 Performance Monitoring**

- We monitor user performance to ensure quality and safety. Customers and Drivers receive ratings based on feedback from each other. Low performance (e.g., frequent cancellations, poor communication) may trigger warnings before suspension or termination. Users are notified of performance issues via email or in-app alerts and given 7 days to improve before further action.`;
  driverPerformanceHeading = '13. Driver Performance Display and Deal Acceptance';
  driverPerformanceBody = 'shnell Logistics empowers Drivers with the autonomy to make informed decisions about accepting delivery requests, supported by transparent performance data.';
  pickupLocation = 'Pickup Location';
  selectedLanguage = 'en';

  onLanguageChange() {
    // Implement language change logic here
    console.log(`Language changed to: ${this.selectedLanguage}`);
  }

  logout() {
    // Implement logout logic here
    console.log('User logged out');
  }

  deleteAccount() {
    // Implement delete account logic here
    console.log('Account deletion requested');
  }
}
