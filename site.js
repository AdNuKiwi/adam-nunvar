// Click-to-expand for every photo link marked .zoom
(function () {
  var box, img, cap, lastFocus;
  function build() {
    box = document.createElement("div");
    box.className = "lightbox";
    box.hidden = true;
    box.style.display = "none";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.setAttribute("aria-label", "Expanded image");
    box.innerHTML = '<button class="lightbox-close" type="button" aria-label="Close image">&times;</button>' +
      '<figure><img alt=""><figcaption></figcaption></figure>';
    img = box.querySelector("img");
    cap = box.querySelector("figcaption");
    box.addEventListener("click", function (e) {
      if (e.target === box || e.target.classList.contains("lightbox-close")) close();
    });
    document.body.appendChild(box);
  }
  function open(a) {
    if (!box) build();
    var thumb = a.querySelector("img");
    var fig = a.closest("figure");
    var fc = fig ? fig.querySelector("figcaption") : null;
    img.src = a.getAttribute("href");
    img.alt = thumb ? thumb.alt : "";
    cap.textContent = fc ? fc.textContent : "";
    cap.hidden = !cap.textContent;
    lastFocus = document.activeElement;
    box.hidden = false;
    box.style.display = "flex";
    box.classList.add("open");
    document.documentElement.classList.add("lightbox-on");
    box.querySelector(".lightbox-close").focus();
  }
  function close() {
    box.classList.remove("open");
    box.hidden = true;
    box.style.display = "none";
    img.removeAttribute("src");
    document.documentElement.classList.remove("lightbox-on");
    if (lastFocus) lastFocus.focus();
  }
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a.zoom");
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    open(a);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && box && box.classList.contains("open")) close();
  });
})();
