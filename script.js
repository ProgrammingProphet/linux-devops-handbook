


// script.js
(function () {
  // --- THEME TOGGLE ---
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;
  const moonIcon = '<i class="fas fa-moon"></i>';
  const sunIcon = '<i class="fas fa-sun"></i>';

  function setTheme(theme) {
    if (theme === "light") {
      body.classList.add("light-mode");
      themeToggle.innerHTML = sunIcon;
    } else {
      body.classList.remove("light-mode");
      themeToggle.innerHTML = moonIcon;
    }
    localStorage.setItem("theme", theme);
  }

  const savedTheme = localStorage.getItem("theme") || "dark";
  setTheme(savedTheme);

  themeToggle.addEventListener("click", () => {
    setTheme(body.classList.contains("light-mode") ? "dark" : "light");
  });

  // --- SEARCH + FILTER ---
  const searchInput = document.getElementById("searchInput");
  const sections = document.querySelectorAll("[data-section]");
  const filterBadges = document.querySelectorAll(".filter-badge");
  let activeFilter = "all";
  let showAllSections = true; // Track if we're showing all sections or just one

  function filterAndSearch() {
    const term = searchInput.value.toLowerCase();
    
    // If searching or filtering, show all matching sections
    if (term !== "" || activeFilter !== "all") {
      showAllSections = true;
    }
    
    sections.forEach((section) => {
      const content = section.innerText.toLowerCase();
      const category = section.dataset.category || "";
      let matchesFilter =
        activeFilter === "all" || (category && category.includes(activeFilter));
      let matchesSearch = content.includes(term) || term === "";
      
      if (showAllSections) {
        if (matchesFilter && matchesSearch) {
          section.style.display = "block";
        } else {
          section.style.display = "none";
        }
      }
    });
  }

  searchInput.addEventListener("input", filterAndSearch);

  filterBadges.forEach((badge) => {
    badge.addEventListener("click", () => {
      filterBadges.forEach((b) => b.classList.remove("active"));
      badge.classList.add("active");
      activeFilter = badge.dataset.filter;
      showAllSections = true; // Show all sections when filtering
      
      // Show all sections first
      sections.forEach((section) => {
        section.style.display = "block";
      });
      
      // Remove active from nav links
      document.querySelectorAll(".nav a").forEach((navLink) => {
        navLink.classList.remove("active");
      });
      
      filterAndSearch();
    });
  });

  // --- COLLAPSIBLE SECTIONS with smooth height ---
  const sectionHeaders = document.querySelectorAll(".section-header");
  sectionHeaders.forEach((header) => {
    header.addEventListener("click", function (e) {
      const card = this.closest(".section-card");
      card.classList.toggle("collapsed");
      const icon = this.querySelector(".collapse-icon i");
      if (card.classList.contains("collapsed")) {
        icon.classList.remove("fa-chevron-down");
        icon.classList.add("fa-chevron-right");
      } else {
        icon.classList.remove("fa-chevron-right");
        icon.classList.add("fa-chevron-down");
      }
      const content = card.querySelector(".section-content");
      if (!card.classList.contains("collapsed")) {
        content.style.maxHeight = "none"; // Remove height limit when expanded
      } else {
        content.style.maxHeight = "0";
      }
    });
  });

  // initialize max-height
  document
    .querySelectorAll(".section-card:not(.collapsed) .section-content")
    .forEach((el) => {
      el.style.maxHeight = "none"; // Remove max-height limit for initial load
    });

  // --- COPY TO CLIPBOARD with animation ---
  const copyButtons = document.querySelectorAll(".copy-btn");
  copyButtons.forEach((btn) => {
    btn.addEventListener("click", async function (e) {
      e.stopPropagation();
      const text = this.dataset.copy;
      try {
        await navigator.clipboard.writeText(text);
        const originalHTML = this.innerHTML;
        this.innerHTML = '<i class="fas fa-check"></i> Copied!';
        setTimeout(() => {
          this.innerHTML = originalHTML;
        }, 1500);
      } catch (err) {
        alert("copy failed");
      }
    });
  });

  // --- smooth scroll for sidebar links ---
  const viewModeIndicator = document.getElementById("viewModeIndicator");
  const currentSectionSpan = document.getElementById("currentSection");
  
  document.querySelectorAll(".nav a").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const target = document.getElementById(targetId);
      
      if (target) {
        showAllSections = false; // Set to single section view
        
        // Hide all sections
        sections.forEach((section) => {
          section.style.display = "none";
        });
        
        // Show only the clicked section
        target.style.display = "block";
        
        // Show view mode indicator with section name
        if (viewModeIndicator && currentSectionSpan) {
          const sectionTitle = target.querySelector(".section-header h3");
          if (sectionTitle) {
            currentSectionSpan.textContent = sectionTitle.textContent.trim();
          }
          viewModeIndicator.style.display = "flex";
        }
        
        // Expand the section if it's collapsed
        if (target.classList.contains("collapsed")) {
          target.classList.remove("collapsed");
          const icon = target.querySelector(".collapse-icon i");
          if (icon) {
            icon.classList.remove("fa-chevron-right");
            icon.classList.add("fa-chevron-down");
          }
          const content = target.querySelector(".section-content");
          if (content) {
            content.style.maxHeight = "none"; // Remove height limit
          }
        } else {
          // Even if not collapsed, ensure max-height is set to none
          const content = target.querySelector(".section-content");
          if (content) {
            content.style.maxHeight = "none";
          }
        }
        
        // Scroll to the section
        target.scrollIntoView({ behavior: "smooth" });
        
        // Update active nav link
        document.querySelectorAll(".nav a").forEach((navLink) => {
          navLink.classList.remove("active");
        });
        this.classList.add("active");
        
        // Clear search and reset filter
        searchInput.value = "";
        filterBadges.forEach((b) => b.classList.remove("active"));
        filterBadges[0].classList.add("active"); // Set "All" as active
        activeFilter = "all";
      }
    });
  });

  // --- ACTIVE NAV HIGHLIGHTING ---
  const navLinks = document.querySelectorAll(".nav a");
  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -70% 0px",
    threshold: 0,
  };

  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && showAllSections) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  sections.forEach((section) => observer.observe(section));

  // --- SHOW ALL SECTIONS (click on header) ---
  const showAllBtn = document.getElementById("showAllSections");
  if (showAllBtn) {
    showAllBtn.addEventListener("click", function () {
      showAllSections = true;
      
      // Hide view mode indicator
      if (viewModeIndicator) {
        viewModeIndicator.style.display = "none";
      }
      
      // Show all sections
      sections.forEach((section) => {
        section.style.display = "block";
      });
      
      // Remove active from all nav links
      navLinks.forEach((link) => {
        link.classList.remove("active");
      });
      
      // Clear search
      searchInput.value = "";
      
      // Reset filter to "All"
      filterBadges.forEach((b) => b.classList.remove("active"));
      filterBadges[0].classList.add("active");
      activeFilter = "all";
      
      // Scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // --- EXPANDABLE COMMAND ITEMS ---
  const cmdItems = document.querySelectorAll(".cmd-item");
  
  cmdItems.forEach((item) => {
    const header = item.querySelector(".cmd-item-header");
    const content = item.querySelector(".cmd-item-content");
    
    if (header && content) {
      header.addEventListener("click", function (e) {
        e.stopPropagation();
        
        // Close other items in the same section (optional - remove if you want multiple open)
        const parentSection = item.closest(".section-content");
        if (parentSection) {
          const siblingItems = parentSection.querySelectorAll(".cmd-item");
          siblingItems.forEach((sibling) => {
            if (sibling !== item && sibling.classList.contains("expanded")) {
              sibling.classList.remove("expanded");
            }
          });
        }
        
        // Toggle current item
        item.classList.toggle("expanded");
        
        // Smooth scroll to item if expanding
        if (item.classList.contains("expanded")) {
          setTimeout(() => {
            item.scrollIntoView({ behavior: "smooth", block: "nearest" });
          }, 100);
        }
      });
    }
  });

  // --- Bookmark / mark learned (extra interactive) ---
  // not required but can be added later
})();


  // --- MOBILE MENU TOGGLE ---
  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const sidebar = document.getElementById("sidebar");

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", () => {
      sidebar.classList.toggle("mobile-open");
      
      // Update icon
      const icon = mobileMenuToggle.querySelector("i");
      if (sidebar.classList.contains("mobile-open")) {
        icon.className = "fas fa-times";
      } else {
        icon.className = "fas fa-bars";
      }
    });

    // Close menu when clicking on overlay (sidebar::before)
    sidebar.addEventListener("click", (e) => {
      if (e.target === sidebar && sidebar.classList.contains("mobile-open")) {
        sidebar.classList.remove("mobile-open");
        const icon = mobileMenuToggle.querySelector("i");
        icon.className = "fas fa-bars";
      }
    });

    // Close menu when clicking on a nav link
    const navLinks = document.querySelectorAll(".nav a");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
          sidebar.classList.remove("mobile-open");
          const icon = mobileMenuToggle.querySelector("i");
          icon.className = "fas fa-bars";
        }
      });
    });

    // Close menu on window resize if screen becomes larger
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768 && sidebar.classList.contains("mobile-open")) {
        sidebar.classList.remove("mobile-open");
        const icon = mobileMenuToggle.querySelector("i");
        icon.className = "fas fa-bars";
      }
    });
  }
