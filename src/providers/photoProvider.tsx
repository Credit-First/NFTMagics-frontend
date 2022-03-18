import { LibraryProvider, LibraryCategory, LibraryImage } from 'photoeditorsdk';
import Library from "@/config/library.json"

class PhotoProvider extends LibraryProvider {
    /**
     * This is a method explicitly created for this provider. It makes sure our data
     * JSON has been loaded from the server.
     * @return {Promise}
     * @private
     */
    // loadData() {
    //     if (this.data) {
    //         return Promise.resolve(this.data);
    //     }
    //     return this.loadJSON(
    //         'https://img.ly/static/libraries/unsplash/metadata.json',
    //     ).then(data => {
    //         this.data = data;
    //         console.log(data)
    //         console.log(Library)
    //         return data;
    //     });
    // }

    /**
     * Returns the categories
     * @return {Promise}
     * @resolve {LibraryCategory[]}
     * @abstract
     */
    async getCategories() {
        // return this.loadData().then(data => {
        // Create `Category` instances from our data
        const data = Library;
        return data.categories.map(categoryData => {
            return new LibraryCategory({
                name: categoryData.name,
                coverImageUrl: categoryData.coverImage,
            });
            // });
        });
    }
    /**
     * Returns the images for the given search query
     * @param {String} query
     * @return {Promise}
     * @resolve {LibraryImage[]}
     * @abstract
     */
    async searchImages(query:string) {
        // return this.loadData().then(data => {
        const data = Library;

        return data.images
            .filter(image => {
                // Split query by spaces, make sure all words are present in image title
                // and escape special characters.
                const words = query
                    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
                    .split(/\s+/);
                for (let i = 0; i < words.length; i++) {
                    const word = words[i];
                    const regexp = new RegExp(word, 'i');
                    if (!regexp.test(image.title)) {
                        return false;
                    }
                }
                return true;
            })
            .map(imageData => {
                return new LibraryImage(imageData);
            });
        // });
    }
}

export default PhotoProvider