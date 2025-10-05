// DatoCMS client for fetching skills data
// Falls back to mock data if API key is not available

import mockData from './skills.json';

const DATOCMS_API_KEY = import.meta.env.VITE_DATOCMS_API_KEY;

// Mock DatoCMS client for demonstration
// In a real implementation, you would use the actual DatoCMS client
const createDatoCmsClient = () => {
  if (!DATOCMS_API_KEY) {
    console.warn('DatoCMS API key not found. Using mock data.');
    return null;
  }

  // This is a simplified mock - replace with actual DatoCMS client
  return {
    items: {
      list: async ({ filter }) => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // In real implementation, this would query DatoCMS
        // For now, return mock data
        return mockData.map(item => ({
          id: item.id,
          category: item.category,
          technologyName: item.technologyName,
          icon: { url: item.icon },
          proficiency: item.proficiency,
          description: item.description,
        }));
      }
    }
  };
};

export const fetchSkills = async () => {
  try {
    const client = createDatoCmsClient();
    
    if (!client) {
      console.log('Using mock data for development');
      return mockData;
    }

    const records = await client.items.list({ 
      filter: { type: 'skill' } 
    });
    
    return records.map(record => ({
      id: record.id,
      category: record.category,
      technologyName: record.technologyName,
      icon: record.icon?.url || record.icon,
      proficiency: record.proficiency,
      description: record.description,
    }));
  } catch (error) {
    console.error('Error fetching data from DatoCMS:', error);
    console.log('Falling back to mock data');
    return mockData;
  }
};

// DatoCMS schema example for reference
export const DATOCMS_SCHEMA = {
  skill: {
    fields: [
      {
        field: 'category',
        type: 'string',
        label: 'Category',
        validators: {
          required: true,
          enum: {
            values: ['Frontend', 'Backend', 'Database', 'Cloud & DevOps', 'Tools & Others']
          }
        }
      },
      {
        field: 'technologyName',
        type: 'string',
        label: 'Technology Name',
        validators: { required: true }
      },
      {
        field: 'icon',
        type: 'file',
        label: 'Icon',
        validators: { required: true }
      },
      {
        field: 'proficiency',
        type: 'integer',
        label: 'Proficiency Level',
        validators: { 
          required: true,
          range: { min: 0, max: 100 }
        }
      },
      {
        field: 'description',
        type: 'text',
        label: 'Description',
        validators: { required: false }
      }
    ]
  }
};
