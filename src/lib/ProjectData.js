export default class ProjectData{
    constructor({id, name, subtitle,year, image, link, width, height, x, y,tags}){
        this.id = id;
        this.name = name;
        this.subtitle = subtitle;
        this.year = year;
        this.image = image;
        this.link = link;
        this.tags = tags;

        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
    }
}
