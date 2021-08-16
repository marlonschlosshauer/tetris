(ns tetris.input
  (:require [tetris.game :as game]))

;; TODO: fall-through with other bindings (keymap as param?)
(defn handle-inputs [e]
  (case (.-key e) 
    "k" (game/move {:y 1})
    "j" (game/move {:y -1})
    "h" (game/move {:x -1})
    "l" (game/move {:x 1})
    :no-key))

(defn setup-inputs []
  (.addEventListener js/document "keypress" handle-inputs))

