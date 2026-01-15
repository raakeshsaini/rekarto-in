

export const cities = [
  {
    slug: "meerut",
    name: "Meerut",
    state: "Uttar Pradesh",
    hasPartner: true, // ✅ PARTNER EXISTS
    partner: {
      name: "Meerut City Partner",
      whatsapp: "91XXXXXXXXXX"
    },
    verdict: "Good fit",
    context: [
      "Strong presence of local markets and offline retail",
      "Affordable warehouse and shop rents compared to metros",
      "High demand for value clothing and surplus stock"
    ],
    challenges: [
      "Price-sensitive buyers",
      "Requires strong stock rotation discipline"
    ],
    recommendation: [
      "Best suited for operators with 300–800 sq ft space",
      "Works well with mixed thrift and surplus categories"
    ]
  },

  {
    slug: "ludhiana",
    name: "Ludhiana",
    state: "Punjab",
    hasPartner: false, // ❌ NO PARTNER YET
    verdict: "Good fit",
    context: [
      "Large garment manufacturing ecosystem",
      "Experienced traders and distributors"
    ],
    challenges: [
      "High competition",
      "Requires strict pricing discipline"
    ],
    recommendation: [
      "Wholesale-first mindset required",
      "Experienced operators preferred"
    ]
  }
];
