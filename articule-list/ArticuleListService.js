export default {
    async getArticules() {
        const url = "http://localhost:8000/api/articules"
        
        let response;
        let articules;
        
        try {
            response = await fetch(url);
        } catch (error) {
            throw new Error("I was unable to get the articules");
        }
        
        if (!response.ok) {
            throw new Error("Articule not found");
        }
        
        try {
            articules = await response.json();
        } catch (error) {
            throw new Error("I was unable to transform the response to json");
        }
        
        return articules;
    }
}