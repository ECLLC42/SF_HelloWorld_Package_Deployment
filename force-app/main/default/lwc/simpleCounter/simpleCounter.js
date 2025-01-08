import { LightningElement, track } from 'lwc';

export default class SimpleCounter extends LightningElement {
    @track count = 0;

    increment() {
        this.count++;
    }

    decrement() {
        this.count--;
    }
}