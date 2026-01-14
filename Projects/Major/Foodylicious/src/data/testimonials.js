// FeedbackPage data: testimonials (customer reviews) and stats (top metrics)

// This is a static data file - no logic, just arrays of object. Used by: FeedbackPage.jsx

// Array of customer review objects (each object = one review card)
export const testimonials = [
  {
    id: 1,
    name: 'Emily Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80',
    rating: 5,
    comment: 'Absolutely love Foodylicious! The food always arrives hot and fresh. The variety of restaurants is amazing, and the delivery is super fast.',
    date: 'December 2024',
    role: 'Food Enthusiast',
  },
  {
    id: 2,
    name: 'Michael Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
    rating: 5,
    comment: 'Best food delivery app I\'ve ever used. The interface is so easy to navigate, and the customer service is top-notch. Highly recommend!',
    date: 'November 2024',
    role: 'Regular Customer',
  },
  {
    id: 3,
    name: 'Sarah Williams',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80',
    rating: 4,
    comment: 'Great selection of restaurants and the prices are reasonable. The tracking feature is really helpful. Will definitely order again!',
    date: 'November 2024',
    role: 'Verified Buyer',
  },
  {
    id: 4,
    name: 'David Brown',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80',
    rating: 5,
    comment: 'The Chef\'s Selection feature is brilliant! Every dish I\'ve ordered from there has been restaurant quality. Amazing experience!',
    date: 'October 2024',
    role: 'Premium Member',
  },
  {
    id: 5,
    name: 'Lisa Anderson',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80',
    rating: 5,
    comment: 'I order from Foodylicious at least twice a week. The consistency in quality is what keeps me coming back. Love it!',
    date: 'October 2024',
    role: 'Loyal Customer',
  },
];

// Stats displayed at top of FeedbackPage (3 metrics in a row)
export const stats = [
  { value: '4.9', label: 'Average Rating', showStars: true },
  { value: '10K+', label: 'Happy Customers' },
  { value: '98%', label: 'Satisfaction Rate' },
];
