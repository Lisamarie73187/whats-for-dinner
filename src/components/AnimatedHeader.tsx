import React from 'react';
import { motion } from 'framer-motion';

const AnimatedHeader: React.FC = () => {
	const text = 'WTF Should I Make for Dinner?';

	const wordAnimation = {
		hidden: { opacity: 0, y: -50 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				type: 'spring',
				damping: 8,
				stiffness: 100,
			},
		},
	};

	return (
		<motion.div
			initial="hidden"
			animate="visible"
			variants={{
				visible: {
					transition: {
						staggerChildren: 0.2,
					},
				},
			}}
			className="animated-text-container"
		>
			{text.split(' ').map((word, index) => (
				<motion.span
					key={index}
					variants={wordAnimation}
					className="animated-text"
				>
					{word}&nbsp;
				</motion.span>
			))}
		</motion.div>
	);
};

export default AnimatedHeader;
