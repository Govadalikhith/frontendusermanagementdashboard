import axios from 'axios';

const DEPARTMENTS = [
  'Engineering',
  'Marketing',
  'Sales',
  'Design',
  'Product',
  'Human Resources',
  'Finance'
];

/**
 * Fetches seed data from JSONPlaceholder and transforms it to fit our schema.
 * Splits full name into first and last name, and assigns a randomized department.
 */
export async function seedUsers() {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    return response.data.map((user, index) => {
      const nameParts = user.name.trim().split(/\s+/);
      let firstName = nameParts[0] || '';
      let lastName = nameParts.slice(1).join(' ') || '';

      // Clean up common prefixes if needed, but simple split is fine as per assignment guidelines.
      // We will assign a deterministic department based on index so it is consistent across restarts,
      // or random. Deterministic is better for tests and consistency.
      const department = DEPARTMENTS[index % DEPARTMENTS.length];

      return {
        id: user.id,
        firstName,
        lastName,
        email: user.email,
        department,
        phone: user.phone || 'N/A',
        website: user.website || 'N/A',
        company: user.company?.name || 'N/A'
      };
    });
  } catch (error) {
    console.error('Error seeding users from JSONPlaceholder:', error.message);
    // Return a fallback set of users in case the JSONPlaceholder API is offline
    return [
      { id: 1, firstName: 'Leanne', lastName: 'Graham', email: 'Sincere@april.biz', department: 'Engineering' },
      { id: 2, firstName: 'Ervin', lastName: 'Howell', email: 'Shanna@melissa.tv', department: 'Marketing' },
      { id: 3, firstName: 'Clementine', lastName: 'Bauch', email: 'Nathan@yesenia.net', department: 'Sales' },
      { id: 4, firstName: 'Patricia', lastName: 'Lebsack', email: 'Julianne.OConner@kory.org', department: 'Design' },
      { id: 5, firstName: 'Chelsey', lastName: 'Dietrich', email: 'Lucio_Hettinger@annie.ca', department: 'Product' }
    ];
  }
}
