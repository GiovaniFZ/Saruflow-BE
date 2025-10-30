import { describe, expect, it } from 'vitest';
import { InMemoryUsersRepository } from '../../../../repositories/in-memory-users-repository';

describe('should pass', () => {
  it('Should be able to register a user successfully', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository();
    const user = {
      id: '1',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'securepassword',
    };
    await inMemoryUsersRepository.create(user);

    expect(inMemoryUsersRepository.users).toContainEqual(user);
    expect(inMemoryUsersRepository.users).toHaveLength(1);
  });
});
