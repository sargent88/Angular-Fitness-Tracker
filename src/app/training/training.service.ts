import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subject } from "rxjs/Subject";
import { Subscription } from 'rxjs/Subscription';

import { Exercise } from "./exercise.model";
import { UIService } from '../shared/ui.service';

@Injectable()
export class TrainingService {
    exerciseChanged = new Subject<Exercise>();
    exercisesChanged = new Subject<Exercise[]>();
    finishedExercisesChanged = new Subject<Exercise[]>();

    private availableExercises: Exercise[] = [];
    private runningExercise: Exercise;
    private fbSubs: Subscription[] = [];

    constructor(
        private db: AngularFirestore,
        private uiService: UIService
    ) {}

    fetchAvailableExercises() {
        this.uiService.loadingStateChanged.next(true);
        this.fbSubs.push(this.db.collection('availableExercises').snapshotChanges()
        .map(result => {
            return result.map(doc => {
                return {
                    id: doc.payload.doc.id,
                    ...doc.payload.doc.data()
                } as Exercise;
            });
        })
        .subscribe((exercises) => {
            this.uiService.loadingStateChanged.next(false);
            this.availableExercises = exercises;
            this.exercisesChanged.next([...this.availableExercises]);
        }, error => {
            this.uiService.loadingStateChanged.next(false);
            this.uiService.showSnackbar('Fetching exercises failed, please try again.', null, 3000);
            this.exerciseChanged.next(null);
        }));
    }

    startExercise(selectedId) {
        this.runningExercise = this.availableExercises.find(resp => resp.id === selectedId);
        this.exerciseChanged.next({ ...this.runningExercise });
    }

    completeExercise() {
        this.addDataToDatabase({ 
            ...this.runningExercise, 
            date: new Date, 
            state: 'completed' 
        });
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    cancelExercise(progress) {
        this.addDataToDatabase({ 
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

    fetchCompletedOrCancelledExercises() {
        this.fbSubs.push(this.db.collection('finishedExercises').valueChanges()
        .subscribe((exercises: Exercise[]) => {
            this.finishedExercisesChanged.next(exercises);
        }));
    }

    cancelSubscriptions() {
        this.fbSubs.forEach(sub => sub.unsubscribe());
    }

    private addDataToDatabase(exercise) {
        this.db.collection('finishedExercises').add(exercise);
    }
}