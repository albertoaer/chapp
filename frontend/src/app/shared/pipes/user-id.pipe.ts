import { Pipe, PipeTransform } from '@angular/core';
import { User } from '@shared/domain';

@Pipe({
  name: 'userId'
})
export class UserIdPipe implements PipeTransform {
  transform(value: User.Identification): string {
    return value.name + ':' + value.id;
  }
}
