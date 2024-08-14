import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

export interface ScheduleForm {
  morningSession: FormGroup<{
    from: FormControl<string>;
    to: FormControl<string>;
  }>;
  eveningSession: FormGroup<{
    from: FormControl<string>;
    to: FormControl<string>;
  }>;
}
