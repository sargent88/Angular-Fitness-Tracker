import { Subject } from "rxjs/Subject";

import { Exercise } from "./exercise.model";

export class TrainingService {
    exerciseChanged = new Subject<Exercise>();

    private availableExercises: Exercise[] = [
        { id: 'crunches', name: 'Crunches', duration: 90, calories: 60},
        { id: 'toe-touch', name: 'Toe Touch', duration: 180, calories: 80},
        { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 150},
        { id: 'burpees', name: 'Burpees', duration: 60, calories: 120}
    ];
    private runningExercise: Exercise;
    private exercises: Exercise[] = [];

    getAvailableExercises() {
        return this.availableExercises.slice();
    }

    startExercise(selectedId) {
        this.runningExercise = this.availableExercises.find(resp => resp.id === selectedId);
        this.exerciseChanged.next({ ...this.runningExercise });
    }

    completeExercise() {
        this.exercises.push({ 
            ...this.runningExercise, 
            date: new Date, 
            state: 'completed' 
        });
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    cancelExercise(progress) {
        this.exercises.push({ 
            ...this.runningExercise, 
            duration: this.runningExercise.duration * (progress / 100),
            calories: this.runningExercise.calories * (progress / 100),
            date: new Date, 
            state: 'cancelled'
        });
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    getRunningExercise() {
        return { ...this.runningExercise };
    }

    getCompletedOrCancelledExercises() {
        return this.exercises.slice();
    }
}