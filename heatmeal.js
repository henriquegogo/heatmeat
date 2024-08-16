["click", "submit"].forEach((eventType) => {
  window.addEventListener(eventType, (ev) => {
    // Initialize variables from element that triggered the event
    const {
      target, action, href = action,
      method = ev.target._method?.value, data = {...ev.target.dataset}
    } = Object.fromEntries([...ev.target.attributes].map((attr) => [
      attr.name.replace(/^data-/, ""), attr.value
    ]));

    // Default behavior if target is not defined or is not a selector
    if (!target || !["#", "."].includes(target[0])) return;
    ev.preventDefault();

    // Initialize formData with form fields and data-* attributes
    const formData = new FormData(
      ev.target.nodeName === "FORM" ? ev.target : undefined
    );
    formData.delete("_method");
    Object.entries(data).forEach(([key, value]) => formData.append(key, value));

    // Dispatch Change Event on target - work as a 'before load' event
    const targetElements = document.querySelectorAll(target);
    targetElements.forEach((el) => el.dispatchEvent(new Event("change")));

    // GET should not have body. Convert formData to queryString if it's GET
    const hasBody = method && method.toLowerCase() !== "get";
    const url = hasBody ? href : `${href}?${new URLSearchParams(formData)}`;

    // Fetch data and pass body if it's POST/PUT
    fetch(url, hasBody ? { method, body: formData } : {})
      .then((res) => (res.ok ? res.text() : Promise.reject(res)))
      .then((text) => targetElements.forEach((el) => {
        // Update target element based on data-position attribute
        const position = el.dataset.position || "innerHTML";
        if (position.startsWith("inner") || position.startsWith("outer"))
          el[position] = text;
        else el.insertAdjacentHTML(position, text);
        el.dispatchEvent(new Event("load"));
      }))
      .catch((err) => targetElements.forEach((el) => el.dispatchEvent(
        new ErrorEvent("error", { message: err.statusText || err.status })
      )));
  });
});
