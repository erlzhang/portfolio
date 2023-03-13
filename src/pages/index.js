import * as React from "react";
import { graphql } from 'gatsby'
import LightGallery from 'lightgallery/react';
// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
// import plugins if you need
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import '../styles/index.css';

export default function Index({data}) {
  console.warn('data', data);
  const site = data.site.siteMetadata;
  const images = data.allImage.nodes;

  const width = 300;
  const height = 240;

  const imgs = images.map(img => {
    return (
      <a href={`${img.url}?x-oss-process=image/resize,l_1280`}>
        <img
          alt="img1"
          src={`${img.url}?x-oss-process=image/resize,m_fill,h_${height},w_${width}`}
          onload={(e) => console.warn('e', e)}
        />
      </a>
    )
  });

  return (
    <div class="container">
      <header class="header">
        <h1>{ site.title }</h1>
        <p>{ site.description }</p>
      </header>
      <main class="main">
        <LightGallery
        speed={500}
        plugins={[lgThumbnail, lgZoom]}
      >
         { imgs }
      </LightGallery>
      </main>
    </div>
  )

}

export const query = graphql`
  query {
    site {
      siteMetadata {
        description
        title
      }
    }
    allImage(sort: {lastModified: DESC}) {
    nodes {
      url
      name
    }
  }
  }

`
