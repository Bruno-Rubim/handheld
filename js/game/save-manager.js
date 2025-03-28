import { allRooms } from "./rooms/room-list.js";

export let startedSections = {}

export function updateSave(){
    startedSections = {
        'section-a': localStorage.getItem('startedSectionA'),
        'section-b': localStorage.getItem('startedSectionB'),
        'section-c': localStorage.getItem('startedSectionC'),
        'section-d': localStorage.getItem('startedSectionD'),
        'section-e': localStorage.getItem('startedSectionE'),
    }
}

export function resetSave(){
    localStorage.setItem('startedSectionB', null);
    localStorage.setItem('startedSectionC', null);
    localStorage.setItem('startedSectionD', null);
    localStorage.setItem('startedSectionE', null);
    for (const room in allRooms){
        allRooms[room].loaded = false
    }
}

export function unlockLevels(){
    localStorage.setItem('startedSectionB', 'yes');
    localStorage.setItem('startedSectionC', 'yes');
    localStorage.setItem('startedSectionD', 'yes');
    localStorage.setItem('startedSectionE', 'yes');
}
