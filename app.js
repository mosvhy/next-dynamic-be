const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();
const PORT = process.env.PORT || 8001;

app.use(cors());
app.use(helmet());
app.use(morgan('combined'));

const pages = [
  { id: 1, slug: '/', title: 'Home', content: 'Welcome to the Home page!' },
  { id: 2, slug: '/about', title: 'About', content: 'This is the About page.' },
  { id: 3, slug: '/contact', title: 'Contact', content: 'This is the Contact page.' },
  { id: 4, slug: '/test', title: 'Test', content: 'This is the Test page.' },
  { id: 5, slug: '/test-2', title: 'Test 2', content: 'This is the Test page.' },
  // { id: 6, slug: '/test-3', title: 'Test 3', content: 'This is the Test page.' },
];
const errorPages = {
  'not-found': { id: 7, slug: '/not-found', title: 'Not Found', content: 'Page Not Found.' },
}

app.get('/api/pages/:pageName', (req, res) => {
  const { pageName } = req.params;
  const sections = {};
  sections['home'] = [
    { id: 1, parentId: null, type: 'hero', title: 'Home', description: 'Home', background: '/assets/img/home.jpg', images: '/assets/img/home.jpg', children: [], },
  ];
  sections['about'] = [
    { id: 1, parentId: null, type: 'header', title: 'About Header', description: 'About Header', background: '/assets/img/about.jpg', images: '/assets/img/about.jpg', children: [], },
    { id: 2, parentId: null, type: 'hero', title: 'About Hero', description: 'About Hero', background: '/assets/img/about.jpg', images: '/assets/img/about.jpg', children: [], },
    { id: 3, parentId: null, type: 'cta', title: 'About CTA 1', description: 'About CTA', background: '/assets/img/about.jpg', images: '/assets/img/about.jpg', children: [], },
    { id: 4, parentId: 3, type: 'cta', title: 'About CTA 1', description: 'About CTA', background: '/assets/img/about.jpg', images: '/assets/img/about.jpg', children: [], },
    { id: 5, parentId: 3, type: 'cta', title: 'About CTA 1', description: 'About CTA', background: '/assets/img/about.jpg', images: '/assets/img/about.jpg', children: [], },
    { id: 6, parentId: 3, type: 'cta', title: 'About CTA 1', description: 'About CTA', background: '/assets/img/about.jpg', images: '/assets/img/about.jpg', children: [], },
    // { id: 3, parentId: null, type: 'cta', title: 'About CTA 2', description: 'About CTA', background: '/assets/img/about.jpg', images: '/assets/img/about.jpg', children: [], },
    // { id: 3, parentId: null, type: 'cta', title: 'About CTA 3', description: 'About CTA', background: '/assets/img/about.jpg', images: '/assets/img/about.jpg', children: [], },
    // { id: 3, parentId: null, type: 'cta', title: 'About CTA 4', description: 'About CTA', background: '/assets/img/about.jpg', images: '/assets/img/about.jpg', children: [], },
  ];
  sections['contact'] = [
    { id: 1, parentId: null, type: 'hero', title: 'Contact', description: 'Contact', background: '/assets/img/contact.jpg', images: '/assets/img/contact.jpg', children: [], },
    { id: 2, parentId: null, type: 'cta', title: 'CTA 1', description: 'Contact', background: '/assets/img/contact.jpg', images: '/assets/img/contact.jpg', children: [], },
    { id: 3, parentId: null, type: 'slider', title: 'About Slider', description: 'About Slider', background: '/assets/img/about.jpg', images: '/assets/img/about.jpg', children: [], },
  ];
  sections['test'] = [
    { id: 1, parentId: null, type: 'hero', title: 'Test', description: 'Test', background: '/assets/img/contact.jpg', images: '/assets/img/contact.jpg', children: [], },
  ];
  sections['test-2'] = [
    { id: 1, parentId: null, type: 'hero', title: 'Test', description: 'Test', background: '/assets/img/contact.jpg', images: '/assets/img/contact.jpg', children: [], },
  ];
  
  const page = pages.find(page => page.slug === `/${pageName}`);
  if (page) {
    return res.status(200).json({
      ...page,
      sections: sections[pageName] || [],
    });
  }
  return res.status(200).json({
    ...errorPages['not-found'],
    sections: [],
  });
});
app.get('/api/pages', (req, res) => {
  
  return res.status(200).json(pages);
});
app.listen(PORT, function(err){
  if (err) console.error(err);
  else console.log('server running on port',PORT)
})