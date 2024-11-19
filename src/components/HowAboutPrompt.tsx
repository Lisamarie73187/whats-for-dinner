import React from 'react';
import { motion } from 'framer-motion';
import useRandomPrompt from '../hooks/useRandomPrompt';
import { promptsArray } from '../prompts';

const HowAboutPrompt = () => {
	const randomPrompt = useRandomPrompt(promptsArray);

	const animations = [
		{
			initial: { y: '-100vh' },
			animate: { y: 0 },
			transition: { type: 'spring', stiffness: 100, damping: 15 },
		},
		{
			initial: { y: '100vh' },
			animate: { y: 0 },
			transition: { type: 'spring', stiffness: 100, damping: 15 },
		},
		{
			initial: { opacity: 0, scale: 0.8 },
			animate: { opacity: 1, scale: 1 },
			transition: { duration: 0.5, ease: 'easeOut' },
		},
		{
			initial: { opacity: 0 },
			animate: { opacity: 1 },
			transition: { duration: 0.8, ease: 'easeOut' },
		},
	];

	const randomAnimation =
		animations[Math.floor(Math.random() * animations.length)];

	return (
		<div className="promptContainer">
			<motion.div
				className="promptSubheading"
				initial={randomAnimation.initial}
				animate={randomAnimation.animate}
				transition={randomAnimation.transition}
			>
				{randomPrompt}
			</motion.div>
		</div>
	);
};

export default HowAboutPrompt;
