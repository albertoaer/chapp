import { UserIdPipe } from './user-id.pipe';

describe('UserIdPipe', () => {
  it('create an instance', () => {
    const pipe = new UserIdPipe();
    expect(pipe).toBeTruthy();
  });
});
