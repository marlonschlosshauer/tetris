(ns tetris.core
    (:require
      [reagent.core :as r]
      [reagent.dom :as d]
      [tetris.game :as game]
      [tetris.input :as input]))

;; -------------------------
;; Views
(defn playfield []
  [:canvas {:id "field" :width 500 :height 500}])

(defn home-page []
  [:div [:h2 "hello to Reagent"] (playfield)])

;; -------------------------
;; Initialize app

(defn mount-root []
  (d/render [home-page] (.getElementById js/document "app"))
  (game/start)
  (input/setup-inputs))

(defn ^:export init! []
  (mount-root))

