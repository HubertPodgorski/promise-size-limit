const getPromiseForFile = (file) => {
    return new Promise((resolve) => {
        let image = new Image();
        image.src = URL.createObjectURL(file);

        image.onload = function () {
            // console.log('height: ', this.height);
            // console.log('width', this.width);

            resolve(
                (() => {
                    console.log('logging');
                    const height = this.height;
                    const width = this.width;

                    this = null;

                    return {height, width}
                })()
            );
        };
    });
};

const callMethod = () => {
    const input = document.querySelector('input');

    input.addEventListener('change', (event) => {
        const images = event.target.files;

        let size = 0;

        const promises = [...images].map((file, index) => {
            const count = 232;

            if (index <= (count - 1)) {
                console.log("index", index);
                size += file.size;
                return getPromiseForFile(file);
            }
        });

        console.log("files size: ",  size);

        Promise.all(promises).then(() => {
            console.log('ALL promises resolved: ');
        })
    })
}

callMethod();