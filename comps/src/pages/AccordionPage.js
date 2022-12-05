import Accordion from '../components/Accordion';

const items = [
    {
        id: '23bh5jk3htjf',
        label: 'Can I use React on a project?',
        content: "You can use React on any project you want it's the" +
                 " best JavaScript framework there is. Highly recommended."
    },
    {
        id: 'g23jfnlkn23s',
        label: 'Can I use JavaScript on a project?',
        content: "You can use JavaScript on any project you want." +
                 " JavaScript is the engine of the internet bro. Not precisely, but" +
                 " it's pretty darn popular and if you want to get a job" +
                 " in the industry you might want to control it very well."
    },
    {
        id: '3n4gjn234gwd',
        label: 'Can I use CSS on a project?',
        content: "You can use CSS on any project you want. It's pretty" +
                 " cool, you can do with it really nice stuff but it" +
                 " won't get you a job really."
    }
];

return <Accordion items={items}/>;