import React from 'react';
import { motion } from 'framer-motion';

interface RecipeProps {
	title: string;
	image?: string;
	url?: string;
	onClick?: () => void;
}

const scaleUpAnimation = {
	initial: { scale: 0 },
	animate: { scale: 1 },
	transition: {
		type: 'spring',
		stiffness: 100,
		damping: 15,
		duration: 0.8,
	},
};

const Recipe: React.FC<RecipeProps> = ({ title, image, onClick }) => (
	<div className="recipe-container" onClick={onClick}>
		<motion.div className="recipe-title" {...scaleUpAnimation}>
			{title}
		</motion.div>
		{image && (
			<motion.div
				className="image-wrapper"
				{...scaleUpAnimation}
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.9 }}
			>
				<img src={image} alt={title} className="recipe-image" />
			</motion.div>
		)}
	</div>
);

export default Recipe;
