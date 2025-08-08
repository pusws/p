document.addEventListener("DOMContentLoaded", function () {
    var navLinks = document.querySelectorAll("nav a");

    navLinks.forEach(function (link) {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            navLinks.forEach((l) => l.classList.remove("active"));
            this.classList.add("active");
            var targetId = this.getAttribute("href").split("#")[1];
            var targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: "smooth" });

                var newUrl =
                    window.location.protocol +
                    "//" +
                    window.location.host +
                    window.location.pathname +
                    "#" +
                    targetId;
                window.history.pushState({ path: newUrl }, "", newUrl);
            }
        });
    });

    function handleHashChange() {
        var hash = window.location.hash;
        if (hash) {
            var targetElement = document.getElementById(hash.substring(1));
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: "smooth" });
                var activeLink = document.querySelector(
                    'nav a[href="' + hash + '"]'
                );
                if (activeLink) {
                    navLinks.forEach((l) => l.classList.remove("active"));
                    activeLink.classList.add("active");
                }
            }
        }
    }

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange(); // Call on initial load
});