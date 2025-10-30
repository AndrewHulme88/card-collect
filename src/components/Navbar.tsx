import React from 'react'
import { Link } from 'react-router-dom'

const Navbar: React.FC = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;


// // src/components/Navbar.tsx
// import React from 'react';
// import { Link } from 'react-router-dom';

// const Navbar: React.FC = () => {
//   return (
//     <nav style={{ padding: '1rem', backgroundColor: '#f5f5f5' }}>
//       <ul style={{ display: 'flex', listStyle: 'none', gap: '1rem', margin: 0 }}>
//         <li>
//           <Link to="/">Home</Link>
//         </li>
//         <li>
//           <Link to="/about">About</Link>
//         </li>
//         <li>
//           <Link to="/contact">Contact</Link>
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;
