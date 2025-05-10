import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 40,
    marginBottom: 20,
  },
  scrollContent: {
    alignItems: "center",
    paddingBottom: 20,
  },
  sinistrosContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 15,
  },
  sinistroCard: {
    width: 100,
    height: 120,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    padding: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
  },
  sinistroImage: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  sinistroText: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
  },
  sinistroInfo: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  bottomTab: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    backgroundColor: "#FFF",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#DDD",
  },
  tabItem: {
    alignItems: "center",
  },
  tabIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  tabText: {
    fontSize: 12,
    marginTop: 5,
  },
});
