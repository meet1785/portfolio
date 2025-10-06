import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../utils/animations';
import { profileIcons } from '../utils/profileIcons';

interface ProfileCardProps {
  platform: string;
  username: string;
  link: string;
}

const ProfileCard = ({ platform, username, link }: ProfileCardProps) => {
  const iconSrc = profileIcons[platform] || "";
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      variants={fadeInUp}
      className="group block backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 text-center"
    >
      {iconSrc && (
        <img
          src={iconSrc}
          alt={`${platform} icon`}
          className="mx-auto w-12 h-12 mb-4 group-hover:scale-110 transition-transform"
        />
      )}
      <h3 className="text-lg font-bold text-white mb-2 font-heading">{platform}</h3>
      <p className="text-white/70 font-body">@{username}</p>
    </motion.a>
  );
}

export default ProfileCard;