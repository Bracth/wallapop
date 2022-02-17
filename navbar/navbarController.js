import { signupService } from "../signup/SignupService.js";

export class NavbarController {
  constructor(navbarElement) {
    this.navbarElement = navbarElement;

    this.handleNavButtons();
  }

  handleNavButtons() {
    this.handleCreateArticuleButton();
    this.handleLoginButton();
    this.handelSignupButton();
    this.handelLogoutButton();
  }

  handleCreateArticuleButton() {
    const loggedUserToken = signupService.getLoggedUser();

    if (loggedUserToken) {
      const navbarNavElement = this.navbarElement.querySelector(".navbar-nav");

      const navItemElement = this.drawCreateAritucleButton();

      navbarNavElement.appendChild(navItemElement);
    }
  }

  handleLoginButton() {
    const loggedUserToken = signupService.getLoggedUser();

    if (!loggedUserToken) {
      const navbarNavElement = this.navbarElement.querySelector(".navbar-nav");

      const navItemElement = this.drawCreateLoginButton();

      navbarNavElement.appendChild(navItemElement);
    }
  }

  handelSignupButton() {
    const loggedUserToken = signupService.getLoggedUser();

    if (!loggedUserToken) {
      const navbarNavElement = this.navbarElement.querySelector(".navbar-nav");

      const navItemElement = this.drawCreateSignupButton();

      navbarNavElement.appendChild(navItemElement);
    }
  }

  handelLogoutButton() {
    const loggedUserToken = signupService.getLoggedUser();

    if (loggedUserToken) {
      const navbarNavElement = this.navbarElement.querySelector(".navbar-nav");

      const navItemElement = this.drawLogoutButton();

      navbarNavElement.appendChild(navItemElement);
      console.log(navbarNavElement);
    }
  }

  drawCreateAritucleButton() {
    const navItemElement = document.createElement("li");
    navItemElement.innerHTML = `
            <li class="nav-item">
                <a class="nav-link" href="/CreatingArticule.html">Create Articule</a>
            </li>
        `;
    return navItemElement;
  }

  drawCreateLoginButton() {
    const navItemElement = document.createElement("li");
    navItemElement.innerHTML = `
             <li class="nav-item">
                 <a class="nav-link active" href="/login.html">Login</a>
             </li>
        `;
    return navItemElement;
  }

  drawCreateSignupButton() {
    const navItemElement = document.createElement("li");
    navItemElement.innerHTML = `
              <li class="nav-item">
                    <a class="nav-link active" href="/signup.html">Signup</a>
            </li>
        `;
    return navItemElement;
  }

  drawLogoutButton() {
    const navItemElement = document.createElement("li");
    navItemElement.innerHTML = `
              <li class="nav-item">
                    <a class="nav-link active" href="/">Logout</a>
            </li>
        `;

    navItemElement.addEventListener("click", () => {
      signupService.logoutUser();
    });

    return navItemElement;
  }
}
