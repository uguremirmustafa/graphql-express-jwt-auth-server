<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Thanks again! Now go create something AMAZING! :D
***
***
***
*** To avoid retyping too much info. Do a search and replace for the following:
*** uguremirmustafa, prepokul-next, uguremirmustafa, uguremirmustafa@gmail.com, Prepokul, Blog and business website for a pre-school organisation.
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

<!-- [![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url] -->

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/uguremirmustafa/prepokul-next">
    <img src="./screenshots/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Prepokul</h3>

  <p align="center">
    Blog and business website for a pre-school organisation.
    <br />
    <a href="https://github.com/uguremirmustafa/prepokul-next"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/uguremirmustafa/prepokul-next">View Demo</a>
    ·
    <a href="https://github.com/uguremirmustafa/prepokul-next/issues">Report Bug</a>
    ·
    <a href="https://github.com/uguremirmustafa/prepokul-next/issues">Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

![Prepokul Home Screen Shot](/screenshots/home.png)

Prepokul is built for helping a pre-school organisation. It is mainly a blog and portfolio website where the owner can control all the content from a CMS(content-management-system). All blog posts are generated at build time, so it is SEO friendly.

### Built With

- [NextJS](https://nextjs.org/)
- [SanityIO](https://www.sanity.io/)
- [SASS](https://sass-lang.com/)
- [Auth0](https://auth0.com/)

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

First of all be sure you have node installed on your computer. You can find detailed instructions [here](https://www.devugur.com/blog/how-to-install-different-node-versions-on-linux) to install node.

- node
  ```sh
  node -v
  ```

I prefer yarn, it is a personal choice.

- yarn
  ```sh
  npm install yarn -g
  ```

For the data, you will need a Sanity project. Go and create one. You can find the my schema files for this project [here.](https://github.com/uguremirmustafa/prepokul-next/schemas)

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/uguremirmustafa/prepokul-next.git
   ```
2. Install NPM packages
   ```sh
   yarn
   # OR
   npm install
   ```
3. Move .env.example to .env.local and fill in the keys
   ```sh
   mv .env.example .env.local
   ```

<!-- USAGE EXAMPLES -->

## Usage

You can find some screenshots of the project.

### Hoverable dropdown menu

![navbar](/screenshots/navbar.png)

### Mosaic style grid layout

![mosaic layout](/screenshots/mosaic.png)

### Downloadable content with authorization

![downloadable content](/screenshots/downloadable.png)

### Pagination with query parameters

![pagination](/screenshots/pagination.png)

<!-- ROADMAP -->

## Roadmap

See the [open issues](https://github.com/uguremirmustafa/prepokul-next/issues) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

Uğur Emirmustafa - [@uguremirmustafa](https://twitter.com/uguremirmustafa) - uguremirmustafa@gmail.com

Project Link: [https://github.com/uguremirmustafa/prepokul-next](https://github.com/uguremirmustafa/prepokul-next)

<!-- ACKNOWLEDGEMENTS -->

## Acknowledgements

- [Framer Motion](https://www.framer.com/developers/)
- [React Query](https://react-query.tanstack.com/)
- [next-sanity-image](https://www.sanity.io/plugins/next-sanity-image)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/uguremirmustafa/repo.svg?style=for-the-badge
[contributors-url]: https://github.com/uguremirmustafa/prepokul-next/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/uguremirmustafa/repo.svg?style=for-the-badge
[forks-url]: https://github.com/uguremirmustafa/prepokul-next/network/members
[stars-shield]: https://img.shields.io/github/stars/uguremirmustafa/repo.svg?style=for-the-badge
[stars-url]: https://github.com/uguremirmustafa/prepokul-next/stargazers
[issues-shield]: https://img.shields.io/github/issues/uguremirmustafa/repo.svg?style=for-the-badge
[issues-url]: https://github.com/uguremirmustafa/prepokul-next/issues
[license-shield]: https://img.shields.io/github/license/uguremirmustafa/repo.svg?style=for-the-badge
[license-url]: https://github.com/uguremirmustafa/prepokul-next/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/uguremirmustafa
