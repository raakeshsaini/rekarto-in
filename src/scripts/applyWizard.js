document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("applyWizard");
  if (!form) return;

  /* ----------------------------------
     STEP NAVIGATION
  ---------------------------------- */
  form.addEventListener("click", function (event) {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;

    const nextAttr = target.getAttribute("data-next");
    const backAttr = target.getAttribute("data-back");

    if (nextAttr) {
      const step = parseInt(nextAttr, 10);
      if (step === 1) {
        const agree = document.getElementById("agreeRules");
        if (!(agree instanceof HTMLInputElement) || !agree.checked) {
          alert("You must agree to the rules to continue.");
          return;
        }
      }
      toggleStep(step, step + 1);
    }

    if (backAttr) {
      const step = parseInt(backAttr, 10);
      toggleStep(step, step - 1);
    }
  });

  /* ----------------------------------
     LOCK ENTER KEY
  ---------------------------------- */
  form.addEventListener("keydown", function (event) {
    if (
      event.key === "Enter" &&
      event.target instanceof HTMLElement &&
      event.target.tagName !== "TEXTAREA"
    ) {
      event.preventDefault();
    }
  });

  /* ----------------------------------
     SUBMIT HANDLER (FIXED)
  ---------------------------------- */
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const whatsapp = form.whatsapp?.value?.trim();
    if (!whatsapp) {
      alert("WhatsApp number is required.");
      return;
    }

    const lockKey = `rekarto_applied_${whatsapp}`;
    if (localStorage.getItem(lockKey)) {
      alert(
        "You have already applied using this WhatsApp number.\nPlease wait for a response."
      );
      return;
    }

    const data = {
      city: form.city?.value || "",
      space: form.space?.value || "",
      budget: form.budget?.value || "",
      business: form.business?.value || "",
      whatsapp,
      intent: form.intent?.value || "",
    };

    // 🔁 FIRE AND FORGET POST (NO await, NO catch trap)
    fetch("https://script.google.com/macros/s/AKfycbx7WBTJzQG0mnaUUMJ8gMAU4TEZzsngtujVV9gYgBlMQFAWWOw7NvorG2hcfQNosTlV/exec", {
      method: "POST",
      body: JSON.stringify(data),
      mode: "no-cors", // 🔑 IMPORTANT
    });

    // 🔒 LOCK DUPLICATE IMMEDIATELY
    localStorage.setItem(lockKey, Date.now().toString());

    /* ----------------------------------
       WHATSAPP ACK (DESKTOP + MOBILE SAFE)
    ---------------------------------- */
    const message = `
Hello ReKarto Team,

I have submitted my application to become a City Partner.

City: ${data.city}

I understand that:
- ReKarto does not sell retail
- No credit is offered
- Pricing is fixed
- Most applications are rejected

Thank you.
    `.trim();

    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = "919193134623"; // 🔁 CHANGE THIS

    // Desktop-safe WhatsApp URL
    window.location.href =
      `https://web.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;

    // Fallback to Thank You page
    setTimeout(() => {
      window.location.href = "/thank-you";
    }, 2500);
  });

  /* ----------------------------------
     STEP TOGGLE
  ---------------------------------- */
  function toggleStep(from, to) {
    const current = form.querySelector(`[data-step="${from}"]`);
    const target = form.querySelector(`[data-step="${to}"]`);

    if (
      !(current instanceof HTMLElement) ||
      !(target instanceof HTMLElement)
    ) {
      return;
    }

    current.hidden = true;
    target.hidden = false;
  }
});
