// Icon mapping for different technologies
import { 
  FaReact, 
  FaJs, 
  FaNodeJs, 
  FaPython, 
  FaJava, 
  FaVue, 
  FaDocker, 
  FaAws, 
  FaGitAlt, 
  FaGithub,
  FaFigma,
  FaDatabase,
  FaServer
} from 'react-icons/fa';
import { 
  SiTypescript, 
  SiNextdotjs, 
  SiTailwindcss, 
  SiRubyonrails, 
  SiPostgresql, 
  SiMongodb, 
  SiRedis, 
  SiKubernetes, 
  SiTerraform,
  SiSpring
} from 'react-icons/si';

export const getIcon = (iconName, size = 40) => {
  const iconProps = { size, className: "text-white" };
  
  const iconMap = {
    // Frontend
    'react': <FaReact {...iconProps} className="text-blue-400" />,
    'javascript': <FaJs {...iconProps} className="text-yellow-400" />,
    'typescript': <SiTypescript {...iconProps} className="text-blue-500" />,
    'nextjs': <SiNextdotjs {...iconProps} className="text-white" />,
    'vue': <FaVue {...iconProps} className="text-green-400" />,
    'tailwind': <SiTailwindcss {...iconProps} className="text-cyan-400" />,
    
    // Backend
    'nodejs': <FaNodeJs {...iconProps} className="text-green-500" />,
    'python': <FaPython {...iconProps} className="text-yellow-500" />,
    'spring': <SiSpring {...iconProps} className="text-green-600" />,
    'rails': <SiRubyonrails {...iconProps} className="text-red-500" />,
    
    // Database
    'postgresql': <SiPostgresql {...iconProps} className="text-blue-600" />,
    'mongodb': <SiMongodb {...iconProps} className="text-green-600" />,
    'redis': <SiRedis {...iconProps} className="text-red-600" />,
    
    // Cloud & DevOps
    'aws': <FaAws {...iconProps} className="text-orange-500" />,
    'docker': <FaDocker {...iconProps} className="text-blue-500" />,
    'kubernetes': <SiKubernetes {...iconProps} className="text-blue-600" />,
    'terraform': <SiTerraform {...iconProps} className="text-purple-500" />,
    'github': <FaGithub {...iconProps} className="text-white" />,
    
    // Tools & Others
    'git': <FaGitAlt {...iconProps} className="text-orange-500" />,
    'figma': <FaFigma {...iconProps} className="text-purple-400" />,
    
    // Fallback icons
    'database': <FaDatabase {...iconProps} className="text-gray-400" />,
    'server': <FaServer {...iconProps} className="text-gray-400" />,
  };

  return iconMap[iconName] || <FaServer {...iconProps} className="text-gray-400" />;
};

export const getCategoryColor = (category) => {
  const colorMap = {
    'Frontend': 'text-blue-400',
    'Backend': 'text-green-400',
    'Database': 'text-purple-400',
    'Cloud & DevOps': 'text-orange-400',
    'Tools & Others': 'text-gray-400',
  };
  
  return colorMap[category] || 'text-gray-400';
};

export const getCategoryBgColor = (category) => {
  const bgColorMap = {
    'Frontend': 'bg-blue-900/20',
    'Backend': 'bg-green-900/20',
    'Database': 'bg-purple-900/20',
    'Cloud & DevOps': 'bg-orange-900/20',
    'Tools & Others': 'bg-gray-900/20',
  };
  
  return bgColorMap[category] || 'bg-gray-900/20';
};
