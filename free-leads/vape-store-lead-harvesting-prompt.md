# AI Lead Harvesting Prompt for Vape Stores (Web Browsing Version)

BROWSE THE WEB FOR ALL DATA FOR THIS CSV.

**OBJECTIVE:** Identify and extract information about online vape stores that ship to the USA and are active on X.com (Twitter), then compile the data into a properly formatted CSV file. Use the **web browsing/tooling capabilities** to search across the open web (search engines, business directories, websites, and public social media pages), rather than interacting directly with X.com as a primary data source.

## Target Profile
- **Business Type:** Online vape stores, e-liquid retailers, vaping supply companies
- **Geographic Requirement:** Ships to the USA (must verify shipping availability)
- **Platform Presence:** Has an X.com (Twitter) business profile mentioned or linked somewhere on the web (website, directory listing, social profile, blog, etc.)
- **Target Use Case:** Businesses that need payment processing solutions

## Search Strategy (Web-First, Not X.com-First)

Use the **browse the web** tool to search the wider internet and only use X.com data that is surfaced indirectly (e.g., via public links, embeds, or cached pages). Do **not** rely on direct scraping or interaction with X.com’s internal search.

### Phase 1: Lead Discovery via Web Search

Use search engines (Google, Bing, etc.) and other public web sources with queries like:

1. **General vape store discovery**
   - `"online vape shop" "ships to USA"`
   - `"vape store" "USA shipping"`
   - `"disposable vapes online" "US customers"`
   - `"e-liquid store" "free USA shipping"`
   - `"vape delivery" "nationwide shipping"`

2. **Vape stores with X presence (indirect)**
   - `"vape shop" "follow us on Twitter"`
   - `"vape store" "X.com" OR "twitter.com"`
   - `"vape business" "find us on X"`
   - `"vape shop" "tweet us" "vape"`

3. **Directory / list style searches**
   - `"best online vape shops" "USA"`
   - `"top vape stores" "United States"`
   - `"vape store directory" "online"`
   - `"vape ecommerce" "US"`  

When you find a candidate website, use the browsing tool to:
- Open the **official website**.
- Look for **social media icons or links** to X.com (Twitter).
- If the website links to an X.com profile, capture that X handle and URL as part of the lead.

### Phase 2: Verification Criteria (Using Web Sources)

For each potential lead, verify via website and other public web pages:

1. **Active X.com presence (indirectly verified)**
   - Check the website for:
     - Embedded X feed widgets (with recent posts if visible).
     - A visible X/Twitter link that appears to belong to the business.
   - If you can access a publicly cached or embedded version of their X profile or tweets via the web (e.g., embedded timeline, social aggregators, cached pages), use that to estimate recency of activity.
   - Consider an account "active" if there is any evidence (embedded posts, third-party sites, recent mentions) that the X account has posted within the last 90 days. If you cannot confirm recency, leave **Last Active Date** blank.

2. **E-commerce capability**
   - Confirm there is an **online store** or checkout/cart system on their website.
   - Verify there are **product listings** for vape-related items (devices, disposables, e-liquids, pods, etc.).

3. **USA shipping**
   - Confirm from the website:
     - Shipping policy page
     - FAQ page
     - Banner text (e.g., “Ships to USA”, “US customers only”, “Worldwide shipping including USA”).
   - If USA shipping cannot be confirmed from any public web page, **do not** include the lead.

4. **Legitimate business**
   - Check for:
     - Branded domain (not just a link aggregator).
     - Company information, about page, or contact page.
     - Product catalog and pricing.
   - Exclude personal/influencer-only sites or blogs **unless** they clearly operate an online vape store.

## Data Points to Collect

Using the browsing tool and public web pages, extract the following information for each lead. When X-specific data cannot be reliably confirmed via web sources (not through direct X scraping), leave those fields blank:

1. **Business Name** - Company/Store name (from website or clear branding)
2. **X Handle** - `@username` as shown in website links or badges (if available)
3. **X Profile URL** - Full URL to their X profile (e.g., `https://x.com/username` or `https://twitter.com/username`) found on their website or other public pages
4. **Website URL** - Main e-commerce site URL
5. **Follower Count** - Only if clearly visible on a public embedded widget, cached page, or third-party site. If not confidently available, leave empty.
6. **Bio Description** - Short description of the business:
   - Preferably the first ~100 characters of how they describe themselves on a public page (e.g., “About” section, meta description, or a snippet from an embedded X widget).
   - If X bio text is not accessible, use a short summary from the website.
7. **Contact Email** - Publicly listed email from the website (contact/FAQ/footer) or directory listing
8. **Location** - City/State or region if mentioned on the website (or clearly indicated elsewhere)
9. **Last Active Date** - Latest known activity date on X if discoverable via embedded posts, cached version, or third-party social aggregators. If not confidently known, leave blank.
10. **Engagement Level** - Rough qualitative estimate (Low / Medium / High) based on any visible likes/retweets from embedded or third-party views. If no reliable data, leave blank.
11. **Products Mentioned** - Types of vape products sold (disposables, mods, e-liquid, pod systems, coils, accessories, etc.) from the website.
12. **Payment Processors Visible** - Any payment logos or mentions on the checkout/footer (e.g., Stripe, Shopify Payments, PayPal, Square, Authorize.net, etc.).

## CSV Output Format

Create a CSV file with the following specifications:
- **Field Delimiter:** Comma (`,`)
- **Text Qualifier:** Double quotes (`"`) around ALL fields
- **Encoding:** UTF-8
- **File Name:** `vape_leads_YYYYMMDD.csv`
- **File Location:** /free-leads (in the open workspace)

### CSV Header Row:
```csv
"Business Name","X Handle","X Profile URL","Website URL","Follower Count","Bio Description","Contact Email","Location","Last Active Date","Engagement Level","Products Mentioned","Payment Processors Visible"
```

### Example Data Row:
```csv
"Cloud Nine Vapes","@cloudninevapes","https://x.com/cloudninevapes","https://cloudninevapes.com","5420","Premium vape shop | Free USA shipping over $50 | Est. 2018","info@cloudninevapes.com","Los Angeles, CA","2025-12-20","Medium (50-100 likes)","Disposables, E-liquid, Pod Systems","Shopify Payments, PayPal"
```

*Note: The example shows an ideal case where all data is available. In practice, leave any field as `""` if you cannot reliably confirm it from publicly accessible web pages.*

## Important Formatting Rules

1. **Wrap all fields in double quotes** to prevent comma-related parsing issues.
2. **Escape internal quotes** - If a field contains a double quote, escape it as `""` (two double quotes).
3. **Remove line breaks** - Replace any newlines within fields with a single space.
4. **Trim whitespace** - Remove leading/trailing spaces from each field.
5. **Handle missing data** - Use empty quotes `""` for any unavailable or unverified fields.

## Quality Control Checklist

Before finalizing each lead, ensure via public web sources:

- [ ] Website clearly shows it is a **vape-related e-commerce business** (not just content or reviews).
- [ ] Website link is functional and shows vape products.
- [ ] USA shipping is explicitly confirmed (shipping policy, banner, FAQ, or other clear text).
- [ ] There is **some evidence** of an X.com presence (icon, link, widget, or mention).
- [ ] Business appears legitimate (clear branding, real products, non-spammy layout).
- [ ] No duplicate entries in the CSV (same website, same business name, or same X handle).

## Search Volume Target

Aim to collect **minimum 200–500 qualified leads** that meet all of the above criteria.

## Deliverable

A single CSV file named `vape_store_leads_[DATE].csv` containing all verified leads with properly quoted fields, ready for import into CRM or email marketing tools.

## Ethical & Legal Considerations

- Only collect **publicly available** information from open web pages.
- Do **not** scrape email addresses that are not intentionally and clearly published for contact.
- Respect each website’s **robots.txt**, terms of service, and any rate/usage limits.
- Do **not** attempt to bypass X.com’s or any other platform’s access controls or technical protections.
- This data is for **B2B sales outreach purposes only** and must be handled in compliance with all applicable privacy and anti-spam laws (e.g., CAN-SPAM, GDPR where relevant).

---

**EXECUTION NOTE:**  
Use the **browse the web** tool to:
- Discover vape stores via search engines and directories.
- Open each store’s website.
- Locate any references or links to an X.com (Twitter) profile.
- Collect and verify data from the website, embedded widgets, cached/third-party social views, and other public pages.  
Document your search queries and the approximate number of results or leads discovered from each major query set for future reference.

YOU MAY NOW PROCEED.