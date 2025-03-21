import { allRooms } from "./rooms/room-list.js";

export let startedSections = {}

export function updateSave(){
    startedSections = {
        'section-a': localStorage.getItem('startedSectionA'),
        'section-b': localStorage.getItem('startedSectionB'),
        'section-c': localStorage.getItem('startedSectionC'),
        'section-d': localStorage.getItem('startedSectionD'),
    }
}

export function resetSave(){
    localStorage.setItem('startedSectionB', null);
    localStorage.setItem('startedSectionC', null);
    localStorage.setItem('startedSectionD', null);
    for (const room in allRooms){
        allRooms[room].loaded = false
    }
}