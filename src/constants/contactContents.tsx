import { BiLogoSteam, BiLogoDiscord, BiLogoTelegram, BiLogoGmail, BiLogoGithub, BiLogoLinkedin } from "react-icons/bi";

export const contactLinks = [
    { label: 'Telegram', href: 'https://t.me/yourusername', color: 'text-[#229ED9]', icon: <BiLogoTelegram className="w-4 h-4" /> },
    { label: 'Email', href: 'mailto:your@email.com', color: 'text-[#F4B400]', icon: <BiLogoGmail className="w-4 h-4" /> },
    { label: 'GitHub', href: 'https://github.com/yourusername', color: 'text-[#6cc644]', icon: <BiLogoGithub className="w-4 h-4" /> },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/yourusername', color: 'text-[#0077B5]', icon: <BiLogoLinkedin className="w-4 h-4" /> },
    { label: 'Discord', href: 'https://discordapp.com/users/yourdiscordid', color: 'text-[#5865F2]', icon: <BiLogoDiscord className="w-4 h-4" /> },
    { label: 'Steam', href: 'https://steamcommunity.com/id/yoursteamid', color: 'text-blue-400', icon: <BiLogoSteam className="w-4 h-4" /> },
];