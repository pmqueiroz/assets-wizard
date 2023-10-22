export const validadeDataTemplate = (data: string) => {
    try {
        const fedTemplate = data.replace('%ASSETS%', '[]')

        JSON.parse(fedTemplate)
        return true
    } catch (error) {
        return false
    }
}
