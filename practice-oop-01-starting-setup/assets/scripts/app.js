
class Component {

    constructor(hostElementId, insertBefore = false) {
        if (hostElementId) {
            this.hostElement = document.getElementById(hostElementId);
        }
        else {
            this.hostElement = document.body;
        }
        this.insertBefore = insertBefore;
    }

    detach() {
        //this will reffer to the subclass
        if (this.elememt)
            this.elememt.remove();
    }

    attach() {
        this.hostElement.insertAdjacentElement(
            this.insertBefore ? 'afterbegin' : 'beforeend', this.elememt
        );
    }

}

class Tooltip extends Component {

    constructor(closeNotifierFn, text, hostElId) {
        super(hostElId);
        this.text = text;
        this.closeNotifier = closeNotifierFn;
        this.create();
    }

    closeToolTip() {
        this.detach();
        this.closeNotifier();
    }

    create() {
        const toolTipElement = document.createElement('div');
        toolTipElement.className = 'card';
        const tooltipTemplate = document.getElementById('tooltip');
        const tooltipBody = document.importNode(tooltipTemplate.content, true);
        tooltipBody.querySelector('p').textContent= this.text;
        toolTipElement.append(tooltipBody);
        this.elememt = toolTipElement;

        const hostElPosLeft = this.hostElement.offsetLeft;
        const hostElPostTop = this.hostElement.offsetTop;
        const hostHeight = this.hostElement.clientHeight;
        const parentElScrolling = this.hostElement.parentElement.scrollTop;
        const x = hostElPosLeft + 20;
        const y = hostElPostTop + hostHeight - 10 - parentElScrolling;


        toolTipElement.style.position = 'absolute';
        toolTipElement.style.left = x + 'px';
        toolTipElement.style.top = y + 'px';
        toolTipElement.addEventListener('click', this.closeToolTip.bind(this));

    }

}

class DOMHelper {
    static moveElement(elementId, newDestinationSelector) {
        //append again - the element wont be copied but moved.
        const elememt = document.getElementById(elementId);
        const destinationElement = document.querySelector(newDestinationSelector);
        destinationElement.append(elememt);
        elememt.scrollIntoView({ behavior: 'smooth' });
    }


    static clearEventListener(element) {
        const cloned = element.cloneNode(true);
        element.replaceWith(cloned);
        return cloned;
    }
}

class ProjectItem {
    hasActiveTooltip = false;
    constructor(id, updateProjectListFunction, type) {
        this.updateProjectListHandler = updateProjectListFunction;
        this.id = id;
        this.connectSwitchButton(type);
        this.connectMoreInfoButton();
        this.connectDragButton();
    }

    showMoreInfoHandler() {
        if (this.hasActiveTooltip) {
            return;
        }
        const projectElement = document.getElementById(this.id);
        const tooltipText = projectElement.dataset.extraInfo;
        const tooltip = new Tooltip(() => this.hasActiveTooltip = false, tooltipText, this.id);
        tooltip.attach();
        this.hasActiveTooltip = true;
    }
    
    connectMoreInfoButton() {
        const projectItemEl = document.getElementById(this.id);
        const moreInfoBtn = projectItemEl.querySelector('button:first-of-type');
        moreInfoBtn.addEventListener('click', this.showMoreInfoHandler.bind(this));
    }

    connectSwitchButton(type) {
        const projectItemEl = document.getElementById(this.id);
        let switchBtn = projectItemEl.querySelector('button:last-of-type');
        switchBtn = DOMHelper.clearEventListener(switchBtn);
        switchBtn.textContent = type === 'active' ? 'Finish' : 'Activate';
        switchBtn.addEventListener('click', this.updateProjectListHandler.bind(null, this.id));
    }

    connectDragButton(){
        document.getElementById(this.id).addEventListener('dragstart', event=>{
            event.dataTransfer.setData('text/plain', this.id);
            event.dataTransfer.effectAllowed = 'move';
        });

    }

    update(updateProjectList, type) {
        this.updateProjectListHandler = updateProjectList;
        this.connectSwitchButton(type);
    }

}

class ProjectList {

    projects = [];
    constructor(type) {
        this.type = type;
        const prjItems = document.querySelectorAll(`#${type}-projects li`);
        for (let prjItem of prjItems) {
            this.projects.push(new ProjectItem(prjItem.id, this.switchProject.bind(this), this.type));
        }
        this.connectDropable();

    }
    setSwitchHandlerFunction(switchHandlerFunction) {
        this.switchHandler = switchHandlerFunction;
    }

    addProject(project) {
        this.projects.push(project);
        DOMHelper.moveElement(project.id, `#${this.type}-projects ul`);
        project.update(this.switchProject.bind(this), this.type);
    }

    connectDropable(){

        const list = document.querySelector(`#${this.type}-projects ul`);
        list.addEventListener('dragenter', event => {
            if(event.dataTransfer.types[0] === 'text/plain'){
                list.parentElement.classList.add('droppable');
                event.preventDefault();
            }
        });

        list.addEventListener('dragover', event => {
            if(event.dataTransfer.types[0] === 'text/plain');
            event.preventDefault();
        });

        list.addEventListener('dragleave', event =>{
            if(event.relatedTarget.closest && event.relatedTarget.closest(`#${this.type}-projects ul`) !== list)
                list.parentElement.classList.remove('droppable');
        });
        list.addEventListener('drop', event =>{
            const prjId = event.dataTransfer.getData('text/plain');
            if(this.projects.find(p => p.id === prjId)){
                return;
            }
            document.getElementById(prjId).querySelector('button:last-of-type').click();
            list.parentElement.classList.remove('droppable');
            event.preventDefault();
        });                                                    
    }
    switchProject(projectId) {
        this.switchHandler(this.projects.find(p => p.id === projectId));
        this.projects = this.projects.filter(p=> p.id !== projectId);
    }

}

class App {
    static init() {
        const activeList = new ProjectList('active');
        const finishedList = new ProjectList('finished');
        activeList.setSwitchHandlerFunction(finishedList.addProject.bind(finishedList));
        finishedList.setSwitchHandlerFunction(activeList.addProject.bind(activeList));
    }
}
App.init();